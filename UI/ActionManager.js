/**
 * Form manager class.
 *
 * @author     OMS Development Team <dev@oms.com>
 * @author     Dennis Eichhorn <d.eichhorn@oms.com>
 * @copyright  2013 Dennis Eichhorn
 * @license    OMS License 1.0
 * @version    1.0.0 * @since      1.0.0
 */
(function (jsOMS)
{
    "use strict";

    /** @namespace jsOMS.UI */
    jsOMS.Autoloader.defineNamespace('jsOMS.UI');

    /**
     * Constructor
     *
     * @param {Object} app Application
     *
     * @method
     *
     * @since 1.0.0
     * @author Dennis Eichhorn <d.eichhorn@oms.com>
     */
    jsOMS.UI.ActionManager = function (app)
    {
        this.app     = app;
        this.actions = {};
    };

    /**
     * Bind button.
     *
     * @param {string} [id] Button id (optional)
     *
     * @method
     *
     * @since 1.0.0
     * @author Dennis Eichhorn <d.eichhorn@oms.com>
     */
    jsOMS.UI.ActionManager.prototype.bind = function (id)
    {
        const uiElements = typeof id === 'undefined' ? document.querySelectorAll('[data-action]') : (typeof id.length !== 'undefined' ? id : [id]),
            length     = uiElements.length;

        for (let i = 0; i < length; i++) {
            if (uiElements[i] !== null && uiElements[i].hasAttribute('data-action')) {
                this.bindElement(uiElements[i]);
            }
        }
    };

    /**
     * Bind button.
     *
     * @param {Element} e Button element
     *
     * @method
     *
     * @since 1.0.0
     * @author Dennis Eichhorn <d.eichhorn@oms.com>
     */
    jsOMS.UI.ActionManager.prototype.bindElement = function (e)
    {
        const listeners      = JSON.parse(e.getAttribute('data-action')),
            listenerLength = listeners.length,
            self = this;

        // For everey action an event is registered
        for (let i = 0; i < listenerLength; i++) {
            let c = [e], hasSelector = false;

            if(listeners[i].hasOwnProperty('selector')) {
                c = documents.querySelectorAll(listenrs[i].selector);
                hasSelector = true;
            }

            let childLength = c.length;

            for(let j = 0; j < childLength; j++) {
                this.bindListener(c[j], listeners[i]);
            }

            // if it has selector then a listener for child events must be implemented since these can potentially changed without any knowledge
            // todo: what if the selector parent is different from "e"? then this doesn't make sense! Maybe this isn't allowed to happen!
            if(hasSelector) {
                this.app.eventManager.attach(e.id + 'childList', function(data) {
                    const length = data.addedNodes.length;

                    for(let j = 0; j < length; j++) {
                        self.bindListener(data.addedNodes[j], listeners[i]);
                    }
                });
                this.app.uiManager.getDOMObserver().observe(e, {childList: true, subtree: true});
            }
        }
    };

    jsOMS.UI.ActionManager.prototype.bindListener = function(e, listener) 
    {
        const self = this,
            actionLength = listener.action.length;

        for (let j = 1; j < actionLength; j++) {
            this.app.eventManager.attach(e.id + listener.action[j - 1].key, function (data)
            {
                self.runAction(e, listener.action[j], data);
            }, false, true);
        }
        // todo: the true here is a memory leak since it should be removed at some point?!
        // todo: handle onload action right after registering everything. this will be used for onload api calls in order to get content such as lists or models. Maybe in the main application after registering a invoke('onload') should be called if the application wants to execute the onload elements

        // Register event for first action
        e.addEventListener(listener.listener, function ()
        {
            self.runAction(this, listener.action[0]);
        });
    };

    /**
     * Run event action.
     *
     * @param {Element} e Button
     * @param {Object} action Action
     *
     * @method
     *
     * @since 1.0.0
     * @author Dennis Eichhorn <d.eichhorn@oms.com>
     */
    jsOMS.UI.ActionManager.prototype.runAction = function (e, action, data)
    {
        const self = this;

        console.log(action.type);

        if (!this.actions.hasOwnProperty(action.type)) {
            console.log('Undefined action ' + action.type);
            return;
        }

        action.data = data;

        this.actions[action.type](action, function (data)
        {
            self.app.eventManager.trigger(e.id + action.key, e.id, data);
        });
    };

    /**
     * Add action callback.
     *
     * @param {string} name Action identifier
     * @param {function} callback Action callback
     *
     * @method
     *
     * @since 1.0.0
     * @author Dennis Eichhorn <d.eichhorn@oms.com>
     */
    jsOMS.UI.ActionManager.prototype.add = function (name, callback)
    {
        this.actions[name] = callback;
    };
}(window.jsOMS = window.jsOMS || {}));
