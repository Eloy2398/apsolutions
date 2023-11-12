$(function () {
    var DOM = {},
        tpl = {},
        oCsDropzone;

    function init() {
        setDOM();
        setTemplates();
        setEvents();

        listar();

        oCsDropzone = new csDropzone('#template', '#previews', '#dzClickable');
    }

    function setDOM() {
        DOM.mdlCategoria = $('#mdlCategoria');
        DOM.div_table = $('#div_table');
        DOM.frmcategoria = $('#frmcategoria');

        DOM.chkmosweb = $("#chkmosweb");
        DOM.chkmosdes = $("#chkmosdes");
    }

    function setTemplates() {
        tpl = UtilGlobal.Templater($('script[type=handlebars-x]'));
    }

    function setEvents() {
        DOM.mdlCategoria.on('shown.bs.modal', function (ev) {
            DOM.frmcategoria.find('.first-input').focus();
        }).on('hidden.bs.modal', function (ev) {
            DOM.frmcategoria.find('input[type=hidden]').val('');
            DOM.frmcategoria[0].reset();
        }).on('hide.bs.modal', function (ev) {
            DOM.frmcategoria.children('.modal-footer').find('input, button').attr('disabled', false);
            DOM.frmcategoria.validate().resetForm();
            DOM.mdlCategoria.find('.modal-title').text('Nuevo');
            oCsDropzone.clearFile();
        });

        DOM.frmcategoria.validate({
            submitHandler: function () {
                guardar();
            },
            rules: UtilGlobal.getRulesFormValidate$(DOM.frmcategoria)
        });

        DOM.div_table.on('click', 'button', function (ev) {
            switch (this.dataset.action) {
                case 'editar':
                    leerDatos(this.parentNode.parentNode.id);
                    break;
                case 'eliminar':
                    eliminar(this.parentNode.parentNode.id);
                    break;
            }
        });
    }

    function guardar() {
        UtilNotification.loading('Guardando datos', 'Espere un momento, por favor...');
        DOM.frmcategoria.children('.modal-footer').find('input, button').attr('disabled', true);

        let elementsForm = DOM.frmcategoria[0].elements;

        new Ajxur.ApiPost({
            modelo: 'categoria',
            metodo: 'guardar',
            data_in: {
                id: elementsForm.hddid.value,
                nombre: elementsForm.txtnombre.value,
                mostrardestacado: DOM.chkmosdes.is(":checked") ? 1 : 0,
                mostrarweb: DOM.chkmosweb.is(":checked") ? 1 : 0
            },
            data_files: {
                file: oCsDropzone.getFile(),
            }
        }, (xhr) => {
            if (xhr.status) {
                swal.fire('Éxito', xhr.message, 'success');
                DOM.mdlCategoria.modal('hide');
                listar();
            } else {
                toastr.error(xhr.message);
                DOM.frmcategoria.children('.modal-footer').find('input, button').attr('disabled', false);
                swal.close();
            }
        });
    }

    csGetFile = function () {
        return oCsDropzone.getFile();
    }

    function leerDatos(id) {
        send_ajxur_request('ApiGet', 'leer', function (xhr) {
            DOM.mdlCategoria.find('.modal-title').text('Editar');

            let xhrdata = xhr.data, elementsForm = DOM.frmcategoria[0].elements;
            UtilGlobal.setDataFormulario(elementsForm, xhrdata);
            elementsForm.hddid.value = id;

            xhrdata.mostrardestacado == 1 ? DOM.chkmosdes.prop("checked", true) : DOM.chkmosdes.prop("checked", false);
            xhrdata.mostrarweb == 1 ? DOM.chkmosweb.prop("checked", true) : DOM.chkmosweb.prop("checked", false);

            oCsDropzone.setFile(xhrdata.imagen);

            DOM.mdlCategoria.modal('show');
        }, undefined, [id]);
    }

    function eliminar(id) {
        UtilNotification.confirm(function (isConfirm) {
            if (isConfirm) {
                send_ajxur_request('ApiPut', 'eliminar', function (xhr) {
                    DOM.div_table.find(`tr#${id}`).remove();
                    swal.fire('Éxito', xhr.message, 'success');
                }, undefined, [id]);
            }
        }, 'Confirmar', '¿Estás seguro de eliminar el registro?', 'pregunta2');
    }

    function listar() {
        send_ajxur_request('ApiGet', 'listar', function (xhr) {
            DOM.div_table.html(tpl.table(xhr.data));
        });
    }

    function send_ajxur_request(requestType, method, fnOk, data_in, data_out) {
        UtilGlobal.sendAjxurRequest('categoria', requestType, method, fnOk, data_in, data_out);
    }

    init();
});