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

        document.getElementById('btn_excel').addEventListener('click', function (ev) {
            exportarExcel();
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
        new Ajxur.ApiGet({
            modelo: 'cotizacion',
            metodo: 'reporte',
            data_params: {
                idCliente: DOM.hdd_cli_id.val(),
                fecha1: DOM.txt_fil_fec1.val(),
                fecha2: DOM.txt_fil_fec2.val()
            }
        }, (xhr) => {
            DOM.tbodyTable.html(tpl.table(xhr.data));
        });
    }

    function exportarExcel() {
        $(document.getElementById('spinner-excel')).show();
        new Ajxur.ApiGet({
            modelo: 'cotizacion',
            metodo: 'reporte/excel',
            responseTypeBlob: true,
            data_params: {
                idCliente: DOM.hdd_cli_id.val(),
                fecha1: DOM.txt_fil_fec1.val(),
                fecha2: DOM.txt_fil_fec2.val()
            }
        }, (xhrdata) => {
            var downloadLink = document.getElementById('downloadLink');
            var blob = new Blob([xhrdata], { type: 'application/octet-stream' });
            var url = window.URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = 'cotizacionReport_' + (new Date()).getTime() + '.xlsx';

            downloadLink.click();

            window.URL.revokeObjectURL(url);

            $(document.getElementById('spinner-excel')).hide();
        }, (xhrError) => {
            toastr.error('Error inesperado');
        });
    }

    init();
});