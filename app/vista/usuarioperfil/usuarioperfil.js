$(function () {
    var DOM = {};

    function init() {
        setDOM();
        setEvents();
    }

    function setDOM() {
        DOM.frmusuario = $('#frmusuario');
        DOM.frmclave = $('#frmclave');
        DOM.ulvistas = $('#ulvistas');

        DOM.txtnuevaclave = $('#txtnuevaclave');
        DOM.txtrepetirclave = $('#txtrepetirclave');
        
        DOM.div_details = $('#div_details');
        DOM.div_modifyuser = $('#div_modifyuser');
        DOM.div_modifypassword = $('#div_modifypassword');
    }

    function setEvents() {
        DOM.ulvistas.on('click', 'button', function (ev) {
            
            $(".nav-link").removeClass('active');
            $(this).addClass('active');

            DOM.div_details.addClass('d-none');
            DOM.div_modifyuser.addClass('d-none');
            DOM.div_modifypassword.addClass('d-none');

            switch (this.dataset.vista) {
                case 'modificar_usuario':
                    DOM.frmusuario[0].reset();
                    DOM.div_modifyuser.removeClass('d-none');
                    break;
                case 'modificar_clave':
                    DOM.frmclave[0].reset();
                    DOM.div_modifypassword.removeClass('d-none');
                    break;
            }
        });

        DOM.frmusuario.validate({
            submitHandler: function (form) {
                guardar(form, 'username');
            },
            rules: UtilGlobal.getRulesFormValidate$(DOM.frmusuario)
        });

        DOM.frmclave.validate({
            submitHandler: function (form) {
                if(DOM.txtnuevaclave.val() != DOM.txtrepetirclave.val()){
                    toastr.error('Las claves ingresadas no coniciden.');
                    DOM.txtrepetirclave.focus();
                }else{
                    guardar(form, 'password');
                }
            },
            rules: UtilGlobal.getRulesFormValidate$(DOM.frmclave)
        });
    }

    function guardar(form, act) {
        let elementsForm = form.elements;

        UtilNotification.loading('Guardando datos', 'Espere un momento, por favor...');

        send_ajxur_request('ApiPost', 'update', function (xhr) {
            swal.fire('Éxito', xhr.message, 'success');
        }, {
            usuario: act == "username" ? elementsForm.txtusuario.value : "",
            claveAnterior: act == "password" ? elementsForm.txtclaveactual.value : "",
            claveNueva: act == "password" ? elementsForm.txtnuevaclave.value : ""
        });
    }

    function send_ajxur_request(requestType, method, fnOk, data_in, data_out) {
        UtilGlobal.sendAjxurRequest('usuarioperfil', requestType, method, fnOk, data_in, data_out);
    }

    init();
});