$(function () {
    var DOM = {},
        tpl = {};

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
        DOM.div_criterio = $('#div_criterio');
    }

    function setTemplates() {
        tpl = UtilGlobal.Templater($('script[type=handlebars-x]'));
    }

    function setEvents() {
        UtilGlobal.setDatepicker(document.getElementById('txtfecha'));
        UtilNumber.setFormatNumberDecimal(DOM.txtbusprecio);
        UtilNumber.setFormatNumber(DOM.txtbuscantidad);

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

        DOM.tbodyTable.on('click', 'button[data-action=editar]', function (ev) {
            verDetalle(this.parentNode.parentNode.id);
        });

    }

    function renderArrDetalle(pArrDetalle) {
        DOM.tbodyDetalle.html(tpl.detalle(pArrDetalle));
    }

    function renderArrCriterio(pArrCriterio) {
        DOM.div_criterio.html(tpl.criterio(pArrCriterio));
    }

    function resetValores() {
        data = {};
        arrDetalle = [];
        renderArrDetalle();
    }

    function verDetalle(id) {
        send_ajxur_request('ApiGet', 'criterioopcion/leer', (xhr) => {
            permitirGuardar = false;
            let elementsForm = DOM.frmcotizacion[0].elements, xhrdata = xhr.data;
            elementsForm.txtfecha.value = xhrdata.fecha;
            elementsForm.txtanexo.value = xhrdata.nombreCliente;
            renderArrDetalle(xhrdata.cotizaciondetalleList);
            renderArrCriterio(xhrdata.cotizacionCriterioOpcionDtoList);
            DOM.mdlCotizacion.find('#div_busqueda_producto').hide();
            DOM.mdlCotizacion.find('.modal-footer').children().attr('disabled', true);
            DOM.mdlCotizacion.modal('show');
        }, undefined, [id]);
    }

    function listar() {
        send_ajxur_request('ApiGet', 'listarWeb', function (xhr) {
            DOM.tbodyTable.html(tpl.table(xhr.data));
        });
    }

    function send_ajxur_request(requestType, method, fnOk, data_in, data_out) {
        UtilGlobal.sendAjxurRequest('cotizacion', requestType, method, fnOk, data_in, data_out);
    }


    init();
});