$(function () {
    var DOM = {},
        tpl = {};

    function init() {
        setDOM();
        setTemplates();
        setEvents();

        listar();
        cargarCombo();
    }

    function setDOM() {
        DOM.mdlUsuario = $('#mdlUsuario');
        DOM.div_table = $('#div_table');
        DOM.frmusuario = $('#frmusuario');
        DOM.txtusuario = $("#txtusuario");
        DOM.txtclave = $("#txtclave");

        DOM.chkusuario = $("#chkusuario");
        DOM.chkclave = $("#chkclave");
        DOM.chkmodusu = $("#chkmodusu");
        DOM.chkmodpass = $("#chkmodpass");
    }

    function setTemplates() {
        tpl = UtilGlobal.Templater($('script[type=handlebars-x]'));
    }

    function setEvents() {
        DOM.mdlUsuario.on('shown.bs.modal', function (ev) {
            DOM.frmusuario.find('.first-input').focus();
        }).on('hidden.bs.modal', function (ev) {
            DOM.frmusuario.find('input[type=hidden]').val('');
            DOM.frmusuario[0].reset();
        }).on('hide.bs.modal', function (ev) {
            DOM.frmusuario.children('.modal-footer').find('input, button').attr('disabled', false);
            DOM.frmusuario.validate().resetForm();
            DOM.mdlUsuario.find('.modal-title').text('Nuevo');

            DOM.txtusuario.prop("disabled", false);
            DOM.txtclave.prop("disabled", false);
            DOM.chkusuario.addClass('d-none');
            DOM.chkclave.addClass('d-none');
        });

        DOM.chkmodusu.on("change", function(){
            if(DOM.chkmodusu.is(":checked")){
                DOM.txtusuario.prop("disabled", false);
            }else{
                DOM.txtusuario.prop("disabled", true);
                DOM.txtusuario.val("");
            }
        });

        DOM.chkmodpass.on("change", function(){
            if(DOM.chkmodpass.is(":checked")){
                DOM.txtclave.prop("disabled", false);
            }else{
                DOM.txtclave.prop("disabled", true);
                DOM.txtclave.val("");
            }
        });

        DOM.frmusuario.validate({
            submitHandler: function (form) {
                guardar(form);
            },
            rules: UtilGlobal.getRulesFormValidate$(DOM.frmusuario)
        });

        DOM.div_table.on('click', 'button', function (ev) {
            switch (this.dataset.action) {
                case 'editar':
                    leerDatos(this.parentNode.parentNode.id);
                    break;
                case 'eliminar':
                    console.log(this.dataset.perfilid);
                    eliminar(this.parentNode.parentNode.id);
                    break;
                case 'bloquear':
                    bloquear(this.parentNode.parentNode.id);
                    break;
            }
        });
    }

    function guardar(form) {
        UtilNotification.loading('Guardando datos', 'Espere un momento, por favor...');
        DOM.frmusuario.children('.modal-footer').find('input, button').attr('disabled', true);

        let elementsForm = form.elements;

        send_ajxur_request('ApiPost', 'guardar', function (xhr) {
            swal.fire('Éxito', xhr.message, 'success');
            DOM.mdlUsuario.modal('hide');
            listar();
        }, {
            id: elementsForm.hddid.value,
            usuario: DOM.chkmodusu.is(":checked") ? elementsForm.txtusuario.value : "",
            clave: DOM.chkmodpass.is(":checked") ? elementsForm.txtclave.value : "",
            nombre: elementsForm.txtnombre.value,
            perfil: {
                id: elementsForm.cboperfil.value
            }
        });
    }

    function bloquear(id) {
        send_ajxur_request('ApiPut', 'bloquear', function (xhr) {
            swal.fire('Éxito', xhr.message, 'success');
            listar();
        },undefined, [id]);
    }

    function leerDatos(id) {
        send_ajxur_request('ApiGet', 'leer', function(xhr) {
            DOM.mdlUsuario.find('.modal-title').text('Editar');
            
            let xhrdata = xhr.data, elementsForm = DOM.frmusuario[0].elements;
            UtilGlobal.setDataFormulario(elementsForm, xhrdata);
            elementsForm.hddid.value = id;
            elementsForm.cboperfil.value = xhrdata.perfil.id;
            elementsForm.txtusuario.value = "";
            elementsForm.txtclave.value = "";

            elementsForm.txtusuario.disabled = true;
            elementsForm.txtclave.disabled = true;
            DOM.chkusuario.removeClass("d-none");
            DOM.chkclave.removeClass("d-none");

            DOM.mdlUsuario.modal('show');
        }, undefined, [id]);
    }

    function eliminar(id) {
        UtilNotification.confirm(function (isConfirm) {
            if (isConfirm) {
                send_ajxur_request('ApiPut', 'eliminar', function (xhr) {
                    DOM.div_table.find(`tr#${id}`).remove();
                    swal.fire('Éxito', xhr.message, 'success');
                },undefined, [id]);
            }
        }, 'Confirmar', '¿Estás seguro de eliminar el registro?', 'pregunta2');
    }

    function listar() {
        send_ajxur_request('ApiGet', 'listar', function (xhr) {
            DOM.div_table.html(tpl.table(xhr.data));
        });
    }

    function cargarCombo() {
        send_ajxur_request('ApiGet', 'cargarPerfil', function (xhr) {
            document.getElementById('cboperfil').innerHTML = tpl.combo(xhr.data);
        });
    }

    function send_ajxur_request(requestType, method, fnOk, data_in, data_out) {
        UtilGlobal.sendAjxurRequest('usuario', requestType, method, fnOk, data_in, data_out);
    }

    init();
});