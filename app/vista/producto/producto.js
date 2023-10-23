$(function () {
    var DOM = {},
        tpl = {};

    function init() {
        setDOM();
        setTemplates();
        setEvents();

        listar();
        cargarDatosExtra();
    }

    function setDOM() {
        DOM.mdlProducto = $('#mdlProducto');
        DOM.tbodyTable = $('#tbodyTable');
        DOM.frmproducto = $('#frmproducto');
        DOM.caracTable = $('#caracTable');
        DOM.txtcaracteristicanombre = $('#txtcaracteristicanombre');
        DOM.txtcaracteristicavalor = $('#txtcaracteristicavalor');
        DOM.btncaracteristicaagregar = $('#btncaracteristicaagregar');
    }

    function setTemplates() {
        tpl = UtilGlobal.Templater($('script[type=handlebars-x]'));
    }

    function setEvents() {
        DOM.mdlProducto.on('shown.bs.modal', function (ev) {
            DOM.frmproducto.find('.first-input').focus();
        }).on('hidden.bs.modal', function (ev) {
            DOM.frmproducto.find('input[type=hidden]').val('');
            // DOM.frmproducto.find('select[name=cboestado]').parent().hide();
            DOM.frmproducto[0].reset();
        }).on('hide.bs.modal', function (ev) {
            DOM.caracTable.html('');
            DOM.frmproducto.children('.modal-footer').find('input, button').attr('disabled', false);
            DOM.frmproducto.validate().resetForm();
            DOM.mdlProducto.find('.modal-title').text('Nuevo');
        });

        DOM.frmproducto.validate({
            submitHandler: function (form) {
                guardar(form);
            },
            rules: UtilGlobal.getRulesFormValidate$(DOM.frmproducto)
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

        DOM.btncaracteristicaagregar.on('click', function (ev) {
            caracteristicaAgregar();
        });

        DOM.caracTable.on('click', '.bx-trash', function (ev) {
            this.parentNode.parentNode.remove();
        });
    }

    function caracteristicaAgregar() {
        let nombre = String(DOM.txtcaracteristicanombre.val()).trim();
        if (nombre == '') return DOM.txtcaracteristicanombre.focus();

        let valor = String(DOM.txtcaracteristicavalor.val()).trim();
        if (valor == '') return DOM.txtcaracteristicavalor.focus();

        let nombreExistente = false;

        DOM.caracTable.find('tr').each((ind, element) => {
            if (String(element.children[0].innerText).trim() == nombre) {
                nombreExistente = true;
                return;
            }
        });

        if (!nombreExistente) {
            DOM.caracTable.append(tpl.caracTable([{ nombre: nombre, valor: valor }]));
            DOM.txtcaracteristicavalor.val('');
            DOM.txtcaracteristicanombre.val('').focus();
        } else {
            DOM.txtcaracteristicanombre.focus();
            toastr.error(`Característica ${nombre} existente`);
        }
    }

    function guardar(form) {
        UtilNotification.loading('Guardando datos', 'Espere un momento, por favor...');
        DOM.frmproducto.children('.modal-footer').find('input, button').attr('disabled', true);

        let elementsForm = form.elements;

        send_ajxur_request('ApiPost', 'guardar', function (xhr) {
            swal.fire('Éxito', xhr.message, 'success');
            DOM.mdlProducto.modal('hide');
            listar();
        }, {
            id: elementsForm.hddid.value,
            codigo: elementsForm.txtcodigo.value,
            nombre: elementsForm.txtnombre.value,
            descripcion: elementsForm.txtdescripcion.value,
            categoria: {
                id: elementsForm.cbocategoria.value
            },
            marca: {
                id: elementsForm.cbomarca.value
            },
            precio: elementsForm.txtprecio.value,
            stock: elementsForm.txtstock.value,
            productoCriterioopcionList: obtenerProductoCriterioopcionList(),
            productoCaracteristicaList: obtenerProductoCaracteristicaList(),
        });
    }

    obtenerProductoCriterioopcionList = function () {
        return [];
    }

    function obtenerProductoCaracteristicaList() {
        let arrList = [];

        DOM.caracTable.find('tr').each((ind, element) => {
            let elementsTr = element.children;
            let nombre = String(elementsTr[0].innerText).trim();
            let valor = String(elementsTr[1].innerText).trim();

            if (nombre != '' && valor != '') {
                arrList.push({
                    nombre: nombre,
                    valor: valor
                });
            }
        });

        return arrList;
    }

    function leerDatos(id) {
        send_ajxur_request('ApiGet', 'leer', function(xhr) {
            DOM.mdlProducto.find('.modal-title').text('Editar');
            
            let xhrdata = xhr.data, elementsForm = DOM.frmproducto[0].elements;

            UtilGlobal.setDataFormulario(elementsForm, xhrdata);
            elementsForm.hddid.value = id;
            elementsForm.cbocategoria.value = xhrdata.categoria.id;
            elementsForm.cbomarca.value = xhrdata.marca.id;

            DOM.caracTable.html(tpl.caracTable(xhrdata.productoCaracteristicaList));

            DOM.mdlProducto.modal('show');
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

    function cargarDatosExtra() {
        send_ajxur_request('ApiGet', 'cargarDatosExtra', function (xhr) {
            document.getElementById('cbocategoria').innerHTML = tpl.combo(xhr.data.categoriaList);
            document.getElementById('cbomarca').innerHTML = tpl.combo(xhr.data.marcaList);
        });
    }

    function send_ajxur_request(requestType, method, fnOk, data_in, data_out) {
        UtilGlobal.sendAjxurRequest('producto', requestType, method, fnOk, data_in, data_out);
    }

    init();
});