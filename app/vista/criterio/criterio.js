$(function(){
    var DOM = {},
        tpl = {};

    function init(){
        setDOM();
        setTemplates();
        setEvents();

        listar();
    }

    function setDOM() {
        DOM.mdlCriterio = $('#mdlCriterio');
        DOM.tbodyTable = $('#tbodyTable');
        DOM.frmcriterio = $('#frmcriterio');
    }

    function setTemplates() {
        tpl = UtilGlobal.Templater($('script[type=handlebars-x]'));
    }

    function setEvents() {
        DOM.mdlCriterio.on('shown.bs.modal', function (ev) {
            DOM.frmcriterio.find('.first-input').focus();
        }).on('hidden.bs.modal', function (ev) {
            DOM.frmcriterio.find('input[type=hidden]').val('');
            // DOM.frmcriterio.find('select[name=cboestado]').parent().hide();
            DOM.frmcriterio[0].reset();
        }).on('hide.bs.modal', function (ev) {
            // DOM.caracTable.html('');
            DOM.frmcriterio.children('.modal-footer').find('input, button').attr('disabled', false);
            DOM.frmcriterio.validate().resetForm();
            DOM.mdlCriterio.find('.modal-title').text('Nuevo');
        });

        DOM.frmcriterio.validate({
            submitHandler: function (form) {
                guardar(form);
            },
            rules: UtilGlobal.getRulesFormValidate$(DOM.frmcriterio)
        });

        DOM.tbodyTable.on('click', 'button', function (ev) {
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

    function listar() {
        send_ajxur_request('ApiGet', 'listar', function (xhr) {
            DOM.tbodyTable.html(tpl.table(xhr.data));
        });
    }

    function send_ajxur_request(requestType, method, fnOk, data_in, data_out) {
        UtilGlobal.sendAjxurRequest('criterio', requestType, method, fnOk, data_in, data_out);
    }


    init();
});