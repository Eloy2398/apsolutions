$(function(){
    var DOM = {},
        tpl = {};

    function init(){
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
                    eliminar(this.parentNode.parentNode.id);
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
            usuario: elementsForm.txtusuario.value,
            clave: elementsForm.txtclave.value,
            nombre: elementsForm.txtnombre.value,
            perfil: {
                id: elementsForm.cboperfil.value
            }
        });
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