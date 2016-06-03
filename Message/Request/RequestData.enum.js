/**
 * Request data enum.
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

    /** @namespace jsOMS.Message.Request */
    jsOMS.Autoloader.defineNamespace('jsOMS.Message.Request');

    jsOMS.Message.Request.RequestLinkRequestData = Object.freeze({
        NORMAL: 'normal',
        OBJECT: 'object'
    });
}(window.jsOMS = window.jsOMS || {}));
