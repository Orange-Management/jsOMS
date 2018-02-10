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
     * @param {string} str String to trim from
     * @param {string} char Char to trim
     *
     * @return {string}
     *
     * @function
     *
     * @since  1.0.0
     */
    jsOMS.trim = function(str, char)
    {
        char = typeof char === 'undefined' ? ' ' : char;

        return jsOMS.ltrim(jsOMS.rtrim(str, char), char);
    };

    /**
     * Trim char from right part of string
     *
     * @param {string} str String to trim from
     * @param {string} char Char to trim
     *
     * @return {string}
     *
     * @function
     *
     * @since  1.0.0
     */
    jsOMS.rtrim = function(str, char)
    {
        char = typeof char === 'undefined' ? ' ' : char;

        return str.replace(new RegExp("[" + char + "]*$"), '');
    };

    /**
     * Trim char from left part of string
     *
     * @param {string} str String to trim from
     * @param {string} char Char to trim
     *
     * @return {string}
     *
     * @function
     *
     * @since  1.0.0
     */
    jsOMS.ltrim = function(str, char)
    {
        char = typeof char === 'undefined' ? ' ' : char;

        return str.replace(new RegExp("^[" + char + "]*"), '');
    };

    /**
     * Count string in string
     *
     * @param {string} str String to inspect
     * @param {string} substr Substring to count
     *
     * @return {int}
     *
     * @function
     *
     * @since  1.0.0
     */
    jsOMS.substr_count = function(str, substr) {
        str    += '';
        substr += '';

        if (substr.length <= 0) {
            return (str.length + 1);
        }

        let n    = 0,
            pos  = 0,
            step = substr.length;

        while (true) {
            pos = str.indexOf(substr, pos);

            if (pos >= 0) {
                ++n;
                pos += step;
            } else {
                break;
            }
        }

        return n;
    };

    /**
     * Integer hash
     *
     * @param {string} str String to hash
     *
     * @return {int}
     *
     * @function
     *
     * @since  1.0.0
     */
    jsOMS.hash = function (str)
    {
        let res   = 0
        const len = str.length;

        for (let i = 0; i < len; i++) {
            res = res * 31 + str.charCodeAt(i);
        }

        return res;
    };

    jsOMS.strpbrk = function (haystack, chars)
    {
        const length = haystack.length;
        for (let i = 0; i < length; ++i) {
            if (chars.indexOf(haystack.charAt(i)) >= 0) {
                return haystack.slice(i);
            }
        }

        return false;
    };

    jsOMS.htmlspecialchars = function (text, quotes) {
        let map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

        if (quotes) {
            map['"'] = '"';
            map["'"] = "'";
        }

        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    };
}(window.jsOMS = window.jsOMS || {}));
