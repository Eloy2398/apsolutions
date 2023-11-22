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
    }

    function setDOM() {
        DOM.tbodyTable = $('#tbodyTable');
        DOM.mdlCotizacion = $('#mdlCotizacion');
        DOM.frmcotizacion = $('#frmcotizacion');
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

        setAutocompleteBuscarCliente();
        setAutocompleteBuscarProducto();

        DOM.mdlCotizacion.on('shown.bs.modal', function (ev) {
            DOM.frmcotizacion.find('.first-input').focus();
        }).on('hidden.bs.modal', function (ev) {
            DOM.frmcotizacion.find('input[type=hidden]').val('');
            DOM.frmcotizacion[0].reset();
        }).on('hide.bs.modal', function (ev) {
            resetValores();
            DOM.frmcotizacion.children('.modal-footer').find('button').attr('disabled', false);
            DOM.frmcotizacion.validate().resetForm();
            DOM.mdlCotizacion.find('#div_busqueda_producto').show();
            DOM.mdlCotizacion.find('.modal-title').text('Nuevo');
        });

        DOM.frmcotizacion.validate({
            submitHandler: function (form) {
                guardar(form);
            },
            rules: UtilGlobal.getRulesFormValidate$(DOM.frmcotizacion)
        });

        DOM.tbodyDetalle.on('click', '.bx-trash', function (ev) {
            eliminarDetalle(this.parentNode.parentNode.id);
        });

        DOM.tbodyTable.on('click', 'button[data-action=anular]', function (ev) {
            anular(this.parentNode.parentNode.id);
        });

        DOM.tbodyTable.on('click', 'button[data-action=editar]', function (ev) {
            verDetalle(this.parentNode.parentNode.id);
        });

        document.getElementById('btnagregar').addEventListener('click', function (ev) {
            agregarDetalle();
        });

    }

    function setAutocompleteBuscarCliente() {
        DOM.txtanexo.autocomplete({
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
                establecerIdcliente(ui.item);
            },
            change: function (event, ui) {
                establecerIdcliente(ui.item);
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

    function establecerIdcliente(pData) {
        if (pData == null) {
            data.clienteId = 0;
        } else {
            data.clienteId = pData.id;
            setTimeout(() => DOM.txtbusproducto.focus(), 100);
        }
    }

    function setAutocompleteBuscarProducto() {
        DOM.txtbusproducto.autocomplete({
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

        let pos = obtenerPosArrDetalle(data.productoId);
        if (pos == -1) {
            arrDetalle.push({
                idProducto: data.productoId,
                nombreProducto: DOM.txtbusproducto.val(),
                cantidad: Number(DOM.txtbuscantidad.val()),
                precio: DOM.txtbusprecio.val(),
            });
        } else {
            arrDetalle[pos].cantidad += Number(DOM.txtbuscantidad.val());
        }

        renderArrDetalle();

        DOM.txtbusproducto.val('').focus();
        DOM.txtbuscantidad.val('');
        DOM.txtbusprecio.val('');
        data.productoId = 0;
    }

    function eliminarDetalle(id) {
        if (id > 0) {
            let pos = obtenerPosArrDetalle(id);
            if (pos > -1) arrDetalle.splice(pos, 1);
            renderArrDetalle();
        } else {
            toastr.error('Indicador no encontrado');
        }
    }

    function obtenerPosArrDetalle(id) {
        return UtilArray.getPosition(arrDetalle, id, 'id');
    }

    function renderArrDetalle(pArrDetalle) {
        DOM.tbodyDetalle.html(tpl.detalle(pArrDetalle ?? arrDetalle));
    }

    function resetValores() {
        data = {};
        arrDetalle = [];
        renderArrDetalle();
    }

    function guardar(form) {
        UtilNotification.confirm(function (isConfirm) {
            if (isConfirm) {
                let arrCotizaciondetalleList = obtenerCotizaciondetalleList();
                if (arrCotizaciondetalleList.length == 0) {
                    toastr.error('No se encontraron productos agregados');
                    return;
                }

                let objParams = {
                    fecha: form.elements.txtfecha.value,
                    idCliente: data.clienteId ?? 0,
                    origen: 1,
                    cotizaciondetalleList: arrCotizaciondetalleList,
                }

                // if (data.clienteId > 0) {
                //     objParams.cliente = {
                //         id: data.clienteId
                //     }
                // }

                UtilNotification.loading('Guardando datos', 'Espere un momento, por favor...');
                DOM.frmcotizacion.children('.modal-footer').find('button').attr('disabled', true);

                send_ajxur_request('ApiPost', 'guardar', (xhr) => {
                    swal.fire('Éxito', xhr.message, 'success');
                    DOM.mdlCotizacion.modal('hide');
                    listar();
                }, objParams);
            }
        });
    }

    function obtenerCotizaciondetalleList() {
        let arrDetalleReturn = [];

        arrDetalle.forEach((item) => {
            arrDetalleReturn.push({
                // producto: {
                //     id: item.id
                // },
                idProducto: item.idProducto,
                cantidad: item.cantidad,
                precio: item.precio,
            });
        });

        return arrDetalleReturn;
    }

    function verDetalle(id) {
        send_ajxur_request('ApiGet', 'leer', (xhr) => {
            permitirGuardar = false;
            let elementsForm = DOM.frmcotizacion[0].elements, xhrdata = xhr.data;
            elementsForm.txtfecha.value = xhrdata.fecha;
            elementsForm.txtanexo.value = xhrdata.nombreCliente;
            renderArrDetalle(xhrdata.cotizaciondetalleList);
            DOM.mdlCotizacion.find('#div_busqueda_producto').hide();
            DOM.mdlCotizacion.find('.modal-footer').children().attr('disabled', true);
            DOM.mdlCotizacion.modal('show');
        }, undefined, [id]);
    }

    function anular(id) {
        UtilNotification.confirm(function (isConfirm) {
            if (isConfirm) {
                send_ajxur_request('ApiPut', 'anular', function (xhr) {
                    listar();
                    swal.fire('Éxito', xhr.message, 'success');
                }, undefined, [id]);
            }
        }, 'Confirmar', '¿Estás seguro de anular la cotizacion?', 'pregunta2');
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