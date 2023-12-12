$(function () {
    var DOM = {},
        tpl = {},
        data = {},
        arrDetalle = [],
        permitirGuardar = true;

    function init() {
        setDOM();
        setTemplates();
        setEvents();

        listar();
    }

    function setDOM() {
        DOM.mdlMovimiento = $('#mdlMovimiento');
        DOM.frmmovimiento = $('#frmmovimiento');
        DOM.tbodyTable = $('#tbodyTable');
        DOM.txtcotizacion = $('#txtcotizacion');
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

        setAutocompleteBuscarPersona();
        setAutocompleteBuscarProducto();
        setAutocompleteBuscarCotizacion();

        DOM.mdlMovimiento.on('shown.bs.modal', function (ev) {
            DOM.frmmovimiento.find('.first-input').focus();
        }).on('hidden.bs.modal', function (ev) {
            DOM.frmmovimiento.find('input[type=hidden]').val('');
            DOM.frmmovimiento.find('select[name=cboestado]').parent().hide();
            DOM.frmmovimiento[0].reset();
        }).on('hide.bs.modal', function (ev) {
            resetValores();
            DOM.frmmovimiento.validate().resetForm();
            DOM.mdlMovimiento.find('#div_busqueda_producto').show();
            DOM.mdlMovimiento.find('.modal-footer').children().attr('disabled', false);
            DOM.mdlMovimiento.find('.modal-title').text('Nuevo');
        });

        DOM.frmmovimiento.validate({
            submitHandler: function (form) {
                guardar(form);
            },
            rules: UtilGlobal.getRulesFormValidate$(DOM.frmmovimiento)
        });

        DOM.tbodyDetalle.on('click', '.bx-trash', function (ev) {
            eliminarDetalle(this.parentNode.parentNode.id);
        });

        DOM.tbodyTable.on('click', 'button[data-action=anular]', function (ev) {
            anular(this.parentNode.parentNode.id);
        }).on('click', 'button[data-action=ver]', function (ev) {
            verDetalle(this.parentNode.parentNode.id);
        });

        document.getElementById('btnagregar').addEventListener('click', function (ev) {
            agregarDetalle();
        });
    }

    function setAutocompleteBuscarPersona() {
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
    }

    function establecerIdpersona(pData) {
        if (pData == null) {
            data.personaId = 0;
        } else {
            data.personaId = pData.id;
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

    function setAutocompleteBuscarCotizacion() {
        DOM.txtcotizacion.autocomplete({
            minLength: 1,
            source: function (request, response) {
                new Ajxur.ApiGet({
                    modelo: 'cotizacion',
                    metodo: 'buscar',
                    data_params: {
                        query: request.term
                    }
                }, (xhr) => response(xhr.data));
            },
            select: function (event, ui) {
                establecerIdCotizacion(ui.item);
            },
            change: function (event, ui) {
                establecerIdCotizacion(ui.item);
            }
        }).autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>")
                .append("<div>"
                    + "<span style=\"width: 30px;\">" + item.id + "</span>"
                    + "<span>" + (item.nombreCliente == null ? 'Cliente Web' : item.nombreCliente) + "</span>"
                    + "</div>")
                .appendTo(ul);
        }
    }

    function establecerIdCotizacion(pData) {
        if (pData == null) {
            toastr.error('Cotización no encontrada');
            data.cotizacionId = 0;
            data.personaId = 0;
            DOM.txtanexo.val('');
            arrDetalle = [];
            renderArrDetalle();
        } else {
            data.cotizacionId = pData.id;
            data.personaId = pData.idPersona;
            DOM.txtanexo.val(pData.nombreCliente);
            document.getElementById('cbotipo').value = 2;
            setTimeout(() => DOM.txtanexo.focus(), 100);
            obtenerDetallesCotizacion(pData.id);
        }
    }

    function agregarDetalle() {
        if (permitirGuardar == false) return;

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
        return UtilArray.getPosition(arrDetalle, id, 'idProducto');
    }

    function renderArrDetalle(pArrDetalle) {
        DOM.tbodyDetalle.html(tpl.detalle(pArrDetalle ?? arrDetalle));
    }

    function resetValores() {
        data = {};
        arrDetalle = [];
        permitirGuardar = true;
        renderArrDetalle();
    }

    function guardar(form) {
        if (permitirGuardar == false) return;

        UtilNotification.confirm(function (isConfirm) {
            if (isConfirm) {
                if (arrDetalle.length == 0) {
                    toastr.error('No se encontraron productos agregados');
                    return;
                }

                let objParams = {
                    fecha: form.elements.txtfecha.value,
                    tipo: form.elements.cbotipo.value,
                    idPersona: data.personaId ?? 0,
                    descripcion: form.elements.txtdescripcion.value,
                    idCotizacion: data.cotizacionId ?? 0,
                    movimientodetalleList: arrDetalle,
                }

                UtilNotification.loading('Guardando datos', 'Espere un momento, por favor...');
                DOM.mdlMovimiento.find('.modal-footer').children().attr('disabled', true);

                send_ajxur_request('ApiPost', 'guardar', (xhr) => {
                    swal.fire('Éxito', xhr.message, 'success');
                    DOM.mdlMovimiento.modal('hide');
                    listar();
                }, objParams);
            }
        });
    }

    function anular(id) {
        UtilNotification.confirm(function (isConfirm) {
            if (isConfirm) {
                send_ajxur_request('ApiPut', 'anular', (xhr) => {
                    swal.fire('Éxito', xhr.message, 'success');
                    listar();
                }, undefined, [id]);
            }
        }, "Confirmar", "¿Estás seguro de anular el registro?", "pregunta2");
    }

    function verDetalle(id) {
        send_ajxur_request('ApiGet', 'leer', (xhr) => {
            permitirGuardar = false;
            let elementsForm = DOM.frmmovimiento[0].elements, xhrdata = xhr.data;
            elementsForm.txtfecha.value = xhrdata.fecha;
            elementsForm.cbotipo.value = xhrdata.tipo;
            elementsForm.txtdescripcion.value = xhrdata.descripcion;
            elementsForm.txtanexo.value = xhrdata.nombrePersona;
            $(elementsForm.cboestado).val(xhrdata.estado ? 1 : 2).parent().show();
            renderArrDetalle(xhrdata.movimientodetalleList);
            DOM.mdlMovimiento.find('#div_busqueda_producto').hide();
            DOM.mdlMovimiento.find('.modal-footer').children().attr('disabled', true);
            DOM.mdlMovimiento.modal('show');
        }, undefined, [id]);
    }

    function listar() {
        send_ajxur_request('ApiGet', 'listar', (xhr) => {
            DOM.tbodyTable.html(tpl.table(xhr.data));
        });
    }

    function obtenerDetallesCotizacion(id) {
        UtilGlobal.sendAjxurRequest('cotizacion', 'ApiGet', 'obtenerDetalles', (xhr) => {
            arrDetalle = xhr.data;
            renderArrDetalle();
        }, undefined, [id]);
    }

    function send_ajxur_request(requestType, method, fnOk, data_in, data_out) {
        UtilGlobal.sendAjxurRequest('movimiento', requestType, method, fnOk, data_in, data_out);
    }

    init();
});