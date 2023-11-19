$(function () {
    var DOM = {},
        tpl = {};

    function init() {
        setDOM();
        // setTemplates();
        setEvents();

        // listar();
    }

    function setEvents() {
        UtilGlobal.setDatepickerBetween('txt_fil_ven_fec1','txt_fil_ven_fec2');

        setAutocompleteBuscarCliente();
    }

    function setDOM() {
        DOM.tbodyTable = $('#tbodyTable');
        DOM.hdd_cli_id = $('#hdd_cli_id');
        DOM.txt_fil_cli_nom = $('#txt_fil_cli_nom');
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
    

    init();
});