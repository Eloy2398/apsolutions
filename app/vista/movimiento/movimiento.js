$(function () {
    var DOM = {},
        tpl = {},
        data = {},
        arrDetalle = [];

    function init() {
        setDOM();
        setTemplates();
        setEvents();

        listar();
        cargarDatosExtra();
    }

    function setDOM() {
        DOM.tbodyTable = $('#tbodyTable');
        DOM.txtbusproducto = $('#txtbusproducto');
        DOM.txtbuscantidad = $('#txtbuscantidad');
        DOM.txtbusprecio = $('#txtbusprecio');
        DOM.txtanexo = $('#txtanexo');
        DOM.tbodyDetalle = $('#tbodyDetalle');
    }

    function setTemplates() {
        tpl = UtilGlobal.Templater($('script[type=handlebars-x]'));
    }

    function setEvents() {
        UtilGlobal.setDatepicker(document.getElementById('txtfecha'));
        UtilNumber.setFormatNumberDecimal(DOM.txtbusprecio);
        UtilNumber.setFormatNumber(DOM.txtbuscantidad);

        DOM.txtanexo.autocomplete({
            minLength: 3,
            source: function (request, response) {
                new Ajxur.ApiGet({
                    modelo: 'movimiento',
                    metodo: 'buscarPersona',
                    data_params: {
                        query: request.term
                    }
                }, (xhr) => response(xhr.data));
            },
            select: function (event, ui) {
                establecerIdpersona(ui.item);
            },
            change: function (event, ui) {
                establecerIdpersona(ui.item);
            }
        }).autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>")
                .append("<div>"
                    + "<span>" + item.documento + "</span>"
                    + "<span>" + item.nombre + "</span>"
                    + "</div>")
                .appendTo(ul);
        }

        DOM.txtbusproducto.autocomplete({
            minLength: 3,
            source: function (request, response) {
                new Ajxur.ApiGet({
                    modelo: 'movimiento',
                    metodo: 'buscarProducto',
                    data_params: {
                        query: request.term
                    }
                }, (xhr) => response(xhr.data));
            },
            select: function (event, ui) {
                establecerIdproducto(ui.item);
            },
            change: function (event, ui) {
                establecerIdproducto(ui.item);
            }
        }).autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>")
                .append("<div>"
                    + "<span>" + item.nombre + "</span>"
                    + "<span>" + item.precio + "</span>"
                    + "</div>")
                .appendTo(ul);
        }

        document.getElementById('btnagregar').addEventListener('click', function (ev) {
            agregarDetalle();
        });
    }

    function establecerIdpersona(pData) {
        if (pData == null) {
            data.personaId = 0;
        } else {
            data.personaId = pData.id;
            setTimeout(() => DOM.txtbusproducto.focus(), 100);
        }
    }

    function establecerIdproducto(pData) {
        if (pData == null) {
            data.productoId = 0;
        } else {
            data.productoId = pData.id;
            DOM.txtbusprecio.val(pData.precio);
            setTimeout(() => DOM.txtbuscantidad.focus(), 100);
        }
    }

    function agregarDetalle() {
        if (data.productoId == undefined || data.productoId == 0) {
            toastr.error('Seleccione producto válido');
            return;
        }

        if (DOM.txtbuscantidad.val() == 0) {
            toastr.error('Ingrese cantidad');
            return;
        }

        arrDetalle.push({
            productoId: data.productoId,
            productoNombre: DOM.txtbusproducto.val(),
            cantidad: DOM.txtbuscantidad.val(),
            precio: DOM.txtbusprecio.val(),
        });

        DOM.tbodyDetalle.html(tpl.detalle(arrDetalle));

        DOM.txtbusproducto.val('').focus();
        DOM.txtbuscantidad.val('');
        DOM.txtbusprecio.val('');
        data.productoId = 0;
    }

    function listar() {
        send_ajxur_request('ApiGet', 'listar', (xhr) => {
            DOM.tbodyTable.html(tpl.table(xhr.data));
        });
    }

    function cargarDatosExtra() {
        // 
    }

    function send_ajxur_request(requestType, method, fnOk, data_in, data_out) {
        UtilGlobal.sendAjxurRequest('movimiento', requestType, method, fnOk, data_in, data_out);
    }

    init();
});