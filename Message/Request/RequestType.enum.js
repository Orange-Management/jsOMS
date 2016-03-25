/**
 * Request type enum.
 *
 * @author     OMS Development Team <dev@oms.com>
 * @author     Dennis Eichhorn <d.eichhorn@oms.com>
 * @copyright  2013 Dennis Eichhorn
 * @license    OMS License 1.0
 * @version    1.0.0 * @since      1.0.0
 */
(function (jsOMS, undefined)
{
    jsOMS.Message.Request.RequestType = Object.freeze({
        JSON: 'json',
        RAW: 'raw'
    });
}(window.jsOMS = window.jsOMS || {}));