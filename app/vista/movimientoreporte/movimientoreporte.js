$(function () {
    var DOM = {},
        tpl = {};

    function init() {
        setDOM();
        setTemplates();
        setEvents();
    }

    function setTemplates() {
        tpl = UtilGlobal.Templater($('script[type=handlebars-x]'));
    }

    function setDOM() {
        DOM.tbodyTable = $('#tbodyTable');
        DOM.hdd_pro_id = $('#hdd_pro_id');
        DOM.txt_fil_pro_nom = $('#txt_fil_pro_nom');
        DOM.txt_fil_fec1 = $('#txt_fil_fec1');
        DOM.txt_fil_fec2 = $('#txt_fil_fec2');
        DOM.btn_filtrar = $('#btn_filtrar');
    }

    function setEvents() {
        UtilGlobal.setDatepickerBetween('txt_fil_fec1','txt_fil_fec2');

        setAutocompleteBuscarProducto();

        DOM.btn_filtrar.on('click', function (ev) {
            listar();
        });
    }

    function setAutocompleteBuscarProducto() {
        DOM.txt_fil_pro_nom.autocomplete({
            minLength: 3,
            source: function (request, response) {
                new Ajxur.ApiGet({
                    modelo: 'producto',
                    metodo: 'buscar',
                    data_params: {
                        query: request.term
                    }
                }, (xhr) => response(xhr.data));
            },
            select: function (event, ui) {
                DOM.hdd_pro_id.val(ui.item.id);
            },
            change: function (event, ui) {
                DOM.hdd_pro_id.val(ui.item.id);
            }
        }).autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>")
                .append("<div>"
                    + "<span>" + item.nombre + "</span>"
                    + "</div>")
                .appendTo(ul);
        }
    }

    function listar() {
        send_ajxur_request('ApiPost', 'reporte', function (xhr) {
            DOM.tbodyTable.html(tpl.table(xhr.data));
        }, {
            idProducto: DOM.hdd_pro_id.val(),
            fecha1: DOM.txt_fil_fec1.val(),
            fecha2: DOM.txt_fil_fec2.val()
        });
    }

    function send_ajxur_request(requestType, method, fnOk, data_in, data_out) {
        UtilGlobal.sendAjxurRequest('movimiento', requestType, method, fnOk, data_in, data_out);
    }
    

    init();
});