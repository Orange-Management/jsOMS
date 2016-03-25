/**
 * Auth class.
 *
 * @author     OMS Development Team <dev@oms.com>
 * @author     Dennis Eichhorn <d.eichhorn@oms.com>
 * @copyright  2013 Dennis Eichhorn
 * @license    OMS License 1.0
 * @version    1.0.0 * @since      1.0.0
 */
(function (jsOMS, undefined)
{

    /**
     * @constructor
     *
     * @since 1.0.0
     * @author Dennis Eichhorn <d.eichhorn@oms.com>
     */
    jsOMS.Auth.Auth = function (uri)
    {
        this.account = null;
        this.uri = uri;
    };

    /**
     * Set account for authentication.
     *
     * @param {Object} account Account
     *
     * @method
     *
     * @since 1.0.0
     * @author Dennis Eichhorn <d.eichhorn@oms.com>
     */
    jsOMS.Auth.Auth.prototype.setAccount = function (account)
    {
        this.account = account;
    };

    /**
     * Get account.
     *
     * @return {Object}
     *
     * @method
     *
     * @since 1.0.0
     * @author Dennis Eichhorn <d.eichhorn@oms.com>
     */
    jsOMS.Auth.Auth.prototype.getAccount = function ()
    {
        return this.account;
    };

    /**
     * Login account.
     *
     * @method
     *
     * @since 1.0.0
     * @author Dennis Eichhorn <d.eichhorn@oms.com>
     */
    jsOMS.Auth.Auth.prototype.login = function ()
    {
        var authRequest = new jsOMS.Message.Request();
        authRequest.setUri(this.uri);
        authRequest.setMethod(jsOMS.Message.Request.RequestMethod.POST);
        authRequest.setResponseType(jsOMS.Message.Request.RequestType.JSON);
        authRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        authRequest.setSuccess(function (xhr)
        {
            this.loginResult(xhr);
        });

        authRequest.send();
    };

    /**
     * Logout account.
     *
     * @method
     *
     * @since 1.0.0
     * @author Dennis Eichhorn <d.eichhorn@oms.com>
     */
    jsOMS.Auth.Auth.prototype.logout = function ()
    {
        location.reload();
    };

    /**
     * Handle login result.
     *
     * @method
     *
     * @since 1.0.0
     * @author Dennis Eichhorn <d.eichhorn@oms.com>
     */
    jsOMS.Auth.Auth.prototype.loginResult = function (xhr)
    {
        console.log(xhr);
        location.reload();
    };
}(window.jsOMS = window.jsOMS || {}));