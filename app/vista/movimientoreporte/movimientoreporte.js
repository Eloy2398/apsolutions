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
    }

    function setEvents() {
        UtilGlobal.setDatepickerBetween('txt_fil_fec1', 'txt_fil_fec2');

        setAutocompleteBuscarProducto();

        document.getElementById('btn_filtrar').addEventListener('click', function (ev) {
            listar();
        });

        document.getElementById('btn_excel').addEventListener('click', function (ev) {
            exportarExcel();
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
        new Ajxur.ApiGet({
            modelo: 'movimiento',
            metodo: 'reporte',
            data_params: {
                idProducto: DOM.hdd_pro_id.val(),
                fecha1: DOM.txt_fil_fec1.val(),
                fecha2: DOM.txt_fil_fec2.val()
            }
        }, (xhr) => {
            if (xhr.status === false) {
                toastr.error(xhr.message);
            }

            DOM.tbodyTable.html(tpl.table(xhr.data));
        });
    }

    function exportarExcel() {
        $(document.getElementById('spinner-excel')).show();
        new Ajxur.ApiGet({
            modelo: 'movimiento',
            metodo: 'reporte/excel',
            responseTypeBlob: true,
            data_params: {
                idProducto: DOM.hdd_pro_id.val(),
                fecha1: DOM.txt_fil_fec1.val(),
                fecha2: DOM.txt_fil_fec2.val()
            }
        }, (xhrdata) => {
            var downloadLink = document.getElementById('downloadLink');
            var blob = new Blob([xhrdata], { type: 'application/octet-stream' });
            var url = window.URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = 'productsReport_' + (new Date()).getTime() + '.xlsx';

            downloadLink.click();

            window.URL.revokeObjectURL(url);

            $(document.getElementById('spinner-excel')).hide();
        }, (xhrError) => {
            toastr.error('Error inesperado');
        });
    }

    init();
});