/**
 * Standard library
 *
 * This library provides useful functionalities for the DOM and other manipulations.
 *
 * @copyright Dennis Eichhorn
 * @license   OMS License 1.0
 * @version   1.0.0
 * @since     1.0.0
 */
(function (jsOMS)
{
    'use strict';

    /**
     * Delayed watcher
     *
     * Used to fire event after delay
     *
     * @return {callback}
     *
     * @since 1.0.0
     */
    jsOMS.watcher = (function ()
    {
        var timer = 0; // eslint-disable-line no-var
        return function (callback, ms)
        {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    /**
     * Merging two arrays recursively
     *
     * @param target Target array
     * @param source Source array
     *
     * @return {Array}
     *
     * @since 1.0.0
     */
    jsOMS.merge = function (target, source)
    {
        const out = jsOMS.clone(target);

        for (const p in source) {
            if (Object.prototype.hasOwnProperty.call(source, p)) {
                // Property in destination object set; update its value.
                if (typeof source[p] === 'object') {
                    out[p] = jsOMS.merge(out[p], source[p]);
                } else {
                    out[p] = source[p];
                }
            } else {
                out[p] = source[p];
            }
        }

        return out;
    };

    /**
     * Shallow clones an object.
     *
     * @param {Object} obj Object to clone
     *
     * @returns {Object}
     *
     * @since 1.0.0
     */
    jsOMS.clone = function (obj)
    {
        return { ...obj };
    };

    /**
     * Check if a value/variable is set
     *
     * @param variable Variable to check for existence.
     *
     * @return {boolean}
     *
     * @since 1.0.0
     */
    jsOMS.isset = function (variable)
    {
        return typeof variable !== 'undefined' && variable !== null;
    };
}(window.jsOMS = window.jsOMS || {}));
