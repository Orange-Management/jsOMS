/**
 * Standard library
 *
 * This library provides useful functionalities for the DOM and other manipulations.
 *
 * @copyright  Dennis Eichhorn
 * @license    OMS License 1.0
 * @version    1.0.0
 * @since      1.0.0
 */
(function (jsOMS)
{
    "use strict";

    /**
     * Trim char from string
     *
     * @param {string} path Array path
     * @param {Object} data Object
     * @param {string} delim Path delimiter
     *
     * @return
     *
     * @function
     *
     * @since  1.0.0
     */
    jsOMS.getArray = function(path, data, delim)
    {
        const pathParts = path.split(delim);
        let current     = data;

        for (let key in pathParts) {
            if (!pathParts.hasOwnProperty(key)) {
                continue;
            }

            if (typeof current === 'undefined' || !current.hasOwnProperty(pathParts[key])) {
                return null;
            }

            current = current[key];
        }

        return current;
    };
}(window.jsOMS = window.jsOMS || {}));
