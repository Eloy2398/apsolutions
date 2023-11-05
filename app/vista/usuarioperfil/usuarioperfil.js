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
    }

    function guardar(form) {

    }

    function send_ajxur_request(requestType, method, fnOk, data_in, data_out) {
        UtilGlobal.sendAjxurRequest('usuarioperfil', requestType, method, fnOk, data_in, data_out);
    }

    init();
});