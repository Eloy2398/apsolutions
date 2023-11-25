$(function () {
    var DOM = {},
        tpl = {};

    function init() {
        setDOM();
        setTemplates();
        setEvents();

        listar();
    }

    function setTemplates() {
        tpl = UtilGlobal.Templater($('script[type=handlebars-x]'));
    }

    function setDOM() {
        DOM.tbodyTable = $('#tbodyTable');
        DOM.tbodyDetalle = $('#tbodyDetalle');
        DOM.mdlCotizacion = $('#mdlCotizacion');
        DOM.frmcotizacion = $('#frmcotizacion');
        DOM.hdd_cli_id = $('#hdd_cli_id');
        DOM.txt_fil_cli_nom = $('#txt_fil_cli_nom');
        DOM.txt_fil_fec1 = $('#txt_fil_fec1');
        DOM.txt_fil_fec2 = $('#txt_fil_fec2');
        DOM.btn_filtrar = $('#btn_filtrar');
    }

    function setEvents() {
        UtilGlobal.setDatepickerBetween('txt_fil_fec1', 'txt_fil_fec2');

        setAutocompleteBuscarCliente();

        DOM.btn_filtrar.on('click', function (ev) {
            listar();
        });
    }

    function setAutocompleteBuscarCliente() {
        DOM.txt_fil_cli_nom.autocomplete({
            minLength: 3,
            source: function (request, response) {
                new Ajxur.ApiGet({
                    modelo: 'cotizacion',
                    metodo: 'buscarCliente',
                    data_params: {
                        query: request.term
                    }
                }, (xhr) => response(xhr.data));
            },
            select: function (event, ui) {
                DOM.hdd_cli_id.val(ui.item.id);
            },
            change: function (event, ui) {
                DOM.hdd_cli_id.val(ui.item.id);
            }
        }).autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>")
                .append("<div>"
                    + "<span>" + item.documento + "</span>"
                    + "<span>" + item.nombre + "</span>"
                    + "</div>")
                .appendTo(ul);
        }
    }

    function listar() {
        send_ajxur_request('ApiPost', 'reporte', function (xhr) {
            DOM.tbodyTable.html(tpl.table(xhr.data));
        }, {
            idCliente: DOM.hdd_cli_id.val(),
            fecha1: DOM.txt_fil_fec1.val(),
            fecha2: DOM.txt_fil_fec2.val()
        });
    }

    function send_ajxur_request(requestType, method, fnOk, data_in, data_out) {
        UtilGlobal.sendAjxurRequest('cotizacion', requestType, method, fnOk, data_in, data_out);
    }


    init();
});