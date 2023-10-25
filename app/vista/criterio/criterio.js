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
        DOM.opcionTable = $('#opcionTable');
        DOM.frmcriterio = $('#frmcriterio');
        DOM.txtopcionnombre = $('#txtopcionnombre');
        DOM.btnopcionagregar = $('#btnopcionagregar');
    }

    function setTemplates() {
        tpl = UtilGlobal.Templater($('script[type=handlebars-x]'));
    }

    function setEvents() {
        DOM.mdlCriterio.on('shown.bs.modal', function (ev) {
            DOM.frmcriterio.find('.first-input').focus();
        }).on('hidden.bs.modal', function (ev) {
            DOM.frmcriterio.find('input[type=hidden]').val('');
            DOM.frmcriterio.find('select[name=cboestado]').parent().hide();
            DOM.frmcriterio[0].reset();
        }).on('hide.bs.modal', function (ev) {
            DOM.opcionTable.html('');
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

        DOM.btnopcionagregar.on('click', function (ev) {
            criterioOpcionAgregar();
        });

        DOM.opcionTable.on('click', '.bx-trash', function (ev) {
            this.parentNode.parentNode.remove();
        });
    }

    function criterioOpcionAgregar(){
        let nombre = String(DOM.txtopcionnombre.val()).trim();
        if (nombre == '') return DOM.txtopcionnombre.focus();

        let nombreExiste = false;

        DOM.opcionTable.find('tr').each((ind, element) => {
            if (String(element.children[0].innerText).trim() == nombre) {
                nombreExiste = true;
                return;
            }
        });

        if (!nombreExiste) {
            DOM.opcionTable.append(tpl.opcionTable([{ nombre: nombre }]));
            DOM.txtopcionnombre.val('').focus();
        } else {
            DOM.txtopcionnombre.focus();
            toastr.error(`El criterio opción ${nombre} existente`);
        }
    }

    function guardar(form) {
        UtilNotification.loading('Guardando datos', 'Espere un momento, por favor...');
        DOM.frmcriterio.children('.modal-footer').find('input, button').attr('disabled', true);

        let elementsForm = form.elements;
        send_ajxur_request('ApiPost', 'guardar', function (xhr) {
            swal.fire('Éxito', xhr.message, 'success');
            DOM.mdlCriterio.modal('hide');
            listar();
        }, {
            id: elementsForm.hddid.value,
            nombre: elementsForm.txtnombre.value,
            estado: true,
            criterioopcionList: obtenerCriterioOpcionList(),
        });
    }

    function obtenerCriterioOpcionList() {
        let arrList = [];

        DOM.opcionTable.find('tr').each((ind, element) => {
            let elementsTr = element.children;
            let nombre = String(elementsTr[0].innerText).trim();

            if (nombre != '') {
                arrList.push({
                    descripcion: nombre
                });
            }
        });

        return arrList;
    }

    function leerDatos(id) {
        send_ajxur_request('ApiGet', 'leer', function(xhr) {
            DOM.mdlCriterio.find('.modal-title').text('Editar');
            
            let xhrdata = xhr.data, elementsForm = DOM.frmcriterio[0].elements;
            console.log(elementsForm);
            UtilGlobal.setDataFormulario(elementsForm, xhrdata);
            elementsForm.hddid.value = id;

            DOM.mdlCriterio.modal('show');
        }, undefined, [id]);
    }

    function eliminar(id) {
        UtilNotification.confirm(function (isConfirm) {
            if (isConfirm) {
                send_ajxur_request('ApiPut', 'eliminar', function (xhr) {
                    DOM.tbodyTable.find(`tr#${id}`).remove();
                    swal.fire('Éxito', xhr.message, 'success');
                }, undefined, [id]);
            }
        }, 'Confirmar', '¿Estás seguro de eliminar el registro?', 'pregunta2');
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