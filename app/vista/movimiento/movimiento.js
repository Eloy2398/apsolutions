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
        DOM.mdlMovimiento = $('#mdlMovimiento');
        DOM.frmmovimiento = $('#frmmovimiento');
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

        setAutocompleteBuscarPersona();
        setAutocompleteBuscarProducto();

        DOM.mdlMovimiento.on('shown.bs.modal', function (ev) {
            DOM.frmmovimiento.find('.first-input').focus();
        }).on('hidden.bs.modal', function (ev) {
            DOM.frmmovimiento.find('input[type=hidden]').val('');
            // DOM.frmmovimiento.find('select[name=cboestado]').parent().hide();
            DOM.frmmovimiento[0].reset();
        }).on('hide.bs.modal', function (ev) {
            resetValores();
            DOM.frmmovimiento.children('.modal-footer').find('button').attr('disabled', false);
            DOM.frmmovimiento.validate().resetForm();
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
                id: data.productoId,
                nombre: DOM.txtbusproducto.val(),
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

    function renderArrDetalle() {
        DOM.tbodyDetalle.html(tpl.detalle(arrDetalle));
    }

    function resetValores() {
        data = {};
        arrDetalle = [];
        renderArrDetalle();
    }

    function guardar(form) {
        UtilNotification.confirm(function (isConfirm) {
            if (isConfirm) {
                let arrMovimientodetalleList = obtenerMovimientodetalleList();
                if (arrMovimientodetalleList.length == 0) {
                    toastr.error('No se encontraron productos agregados');
                    return;
                }

                let objParams = {
                    fecha: form.elements.txtfecha.value,
                    tipo: form.elements.cbotipo.value,
                    descripcion: form.elements.txtdescripcion.value,
                    movimientodetalleList: arrMovimientodetalleList,
                }

                if (data.personaId > 0) {
                    objParams.persona = {
                        id: data.personaId
                    }
                }

                if (data.cotizacionId > 0) {
                    objParams.cotizacion = {
                        id: data.cotizacionId
                    }
                }

                UtilNotification.loading('Guardando datos', 'Espere un momento, por favor...');
                DOM.frmmovimiento.children('.modal-footer').find('button').attr('disabled', true);

                send_ajxur_request('ApiPost', 'guardar', (xhr) => {
                    swal.fire('Éxito', xhr.message, 'success');
                    DOM.mdlMovimiento.modal('hide');
                    listar();
                }, objParams);
            }
        });
    }

    function obtenerMovimientodetalleList() {
        let arrDetalleReturn = [];

        arrDetalle.forEach((item) => {
            arrDetalleReturn.push({
                producto: {
                    id: item.id
                },
                cantidad: item.cantidad,
                precio: item.precio,
            });
        });

        return arrDetalleReturn;
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

    function listar() {
        send_ajxur_request('ApiGet', 'listar', (xhr) => {
            DOM.tbodyTable.html(tpl.table(xhr.data));
        });
    }

    function send_ajxur_request(requestType, method, fnOk, data_in, data_out) {
        UtilGlobal.sendAjxurRequest('movimiento', requestType, method, fnOk, data_in, data_out);
    }

    init();
});