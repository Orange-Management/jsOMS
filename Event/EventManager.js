import { Logger } from '../Log/Logger.js';

/**
 * Request manager class.
 *
 * Used for pooling requests.
 *
 * @copyright Dennis Eichhorn
 * @license   OMS License 1.0
 * @version   1.0.0
 * @since     1.0.0
 */
export class EventManager
{
    /**
     * @constructor
     *
     * @since 1.0.0
     */
    constructor ()
    {
        this.logger    = Logger.getInstance();
        this.groups    = {};
        this.callbacks = {};
    };

    /**
     * Add event group (element)
     *
     * Adding the same event overwrites the existing one as "waiting"
     *
     * @param {string|int} group Group id
     * @param {string|int} id    Event id
     *
     * @return {void}
     *
     * @since 1.0.0
     */
    addGroup (group, id)
    {
        if (typeof this.groups[group] === 'undefined') {
            this.groups[group] = {};
        }

        this.groups[group][id] = false;
    };

    /**
     * Resets the group status
     *
     * @param {string|int} group Group id
     *
     * @return {void}
     *
     * @since 1.0.0
     */
    reset (group)
    {
        for (const id in this.groups[group]) {
            if (this.groups[group].hasOwnProperty(id)) {
                this.groups[group][id] = false;
            }
        }
    };

    /**
     * Does group have outstanding events
     *
     * @param {string|int} group Group id
     *
     * @return {boolean}
     *
     * @since 1.0.0
     */
    hasOutstanding (group)
    {
        if (typeof this.groups[group] === 'undefined') {
            return false;
        }

        for (const id in this.groups[group]) {
            if (!this.groups[group].hasOwnProperty(id) || !this.groups[group][id]) {
                return true;
            }
        }

        return false;
    };

    /**
     * Trigger event based on regex for group and/or id
     *
     * @param {string|int} group  Group id (can be regex)
     * @param {string|int} [id]   Event id (can be regex)
     * @param {Object}     [data] Data for event
     *
     * @return {boolean}
     *
     * @since 1.0.0
     */
    triggerSimilar (group, id = '', data = null)
    {
        const groupIsRegex = group.startsWith('/');
        const idIsRegex    = id.startsWith('/');

        const groups = {};
        if (groupIsRegex) {
            for (const groupName in this.groups) {
                if (groupName.match(group)) {
                    groups[groupName] = [];
                }
            }
        } else {
            groups[group] = [];
        }

        for (const groupName in groups) {
            if (idIsRegex) {
                for (const idName in this.groups[groupName]) {
                    if (idName.match(id)) {
                        groups[groupName].push(idName);
                    }
                }
            } else {
                groups[groupName].push(id);
            }
        }

        let triggerValue = false;
        for (const groupName in groups) {
            for (const id in groups[groupName]) {
                triggerValue = triggerValue || this.trigger(groupName, id, data);
            }
        }

        return triggerValue;
    }

    /**
     * Trigger event finished
     *
     * Executes the callback specified for this group if all events are finished
     *
     * @param {string|int} group  Group id
     * @param {string|int} [id]   Event id
     * @param {Object}     [data] Data for event
     *
     * @return {boolean}
     *
     * @since 1.0.0
     */
    trigger (group, id = '', data = null)
    {
        if (typeof this.callback[group] === 'undefined') {
            return false;
        }

        if (Math.abs(Date.now() - this.callbacks[group].lastRun) < 500) {
            return false;
        }

        if (typeof this.groups[group] !== 'undefined') {
            this.groups[group][id] = true;
        }

        if (!this.hasOutstanding(group)) {
            const length                  = this.callbacks[group].callbacks.length;
            this.callbacks[group].lastRun = Date.now();

            for (let i = 0; i < length; ++i) {
                this.callbacks[group].callbacks[i](data);
            }

            if (this.callbacks[group].remove) {
                this.detach(group);
            } else if (this.callbacks[group].reset) {
                this.reset(group);
            }

            return true;
        }

        return false;
    };

    /**
     * Detach event
     *
     * @param {string|int} group Group id
     *
     * @return {void}
     *
     * @since 1.0.0
     */
    detach (group)
    {
        return this.detachCallback(group) | this.detachGroup(group);
    };

    /**
     * Detach callback
     *
     * @param {string|int} group Group id
     *
     * @return {void}
     *
     * @since 1.0.0
     */
    detachCallback(group)
    {
        if (this.callbacks.hasOwnProperty(group)) {
            delete this.callbacks[group];

            return true;
        }

        return false;
    };

    /**
     * Detach group
     *
     * @param {string|int} group Group id
     *
     * @return {void}
     *
     * @since 1.0.0
     */
    detachGroup(group)
    {
        if (this.groups.hasOwnProperty(group)) {
            delete this.groups[group];

            return true;
        }

        return false;
    };

    /**
     * Attach callback to event group
     *
     * @param {string|int} group    Group id
     * @param {function}   callback Callback or route for the event
     * @param {boolean}    [remove] Should be removed after execution
     * @param {boolean}    [reset]  Reset after triggering
     *
     * @return {boolean}
     *
     * @since 1.0.0
     */
    attach (group, callback, remove = false, reset = false)
    {
        if (!this.callbacks.hasOwnProperty(group)) {
            this.callbacks[group] = {remove: remove, reset: reset, callbacks: [], lastRun: 0};
        }

        this.callbacks[group].callbacks.push(callback);

        return true;
    };

    /**
     * Is a certain group allready attached
     *
     * @param {string|int} group    Group id
     *
     * @return {boolean}
     *
     * @since 1.0.0
     */
    isAttached (group)
    {
        return this.callbacks.hasOwnProperty(group);
    };

    /**
     * Count events
     *
     * @return {int}
     *
     * @since 1.0.0
     */
    count ()
    {
        return Object.keys(this.callbacks).length;
    };
};