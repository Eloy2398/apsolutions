$(function () {
    var DOM = {},
        tpl = {};

    function init() {
        setDOM();
        setTemplates();

        listar();
    }

    function setDOM() {
        DOM.tbodyTable = $('#tbodyTable');
    }

    function setTemplates() {
        tpl = UtilGlobal.Templater($('script[type=handlebars-x]'));
    }

    function listar() {
        send_ajxur_request('ApiGet', 'listar', function (xhr) {
            DOM.tbodyTable.html(tpl.table(xhr.data));
        });
    }

    function send_ajxur_request(requestType, method, fnOk, data_in, data_out) {
        UtilGlobal.sendAjxurRequest('cotizacion', requestType, method, fnOk, data_in, data_out);
    }


    init();
});