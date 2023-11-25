$(function () {
    var DOM = {},
        tpl = {},
        data = {},
        oCsDropzone;

    function init() {
        setDOM();
        setTemplates();
        setEvents();

        listar();
        cargarDatosExtra();

        oCsDropzone = new csDropzone('#template', '#previews', '#dzClickable');
    }

    function setDOM() {
        DOM.mdlProducto = $('#mdlProducto');
        DOM.tbodyTable = $('#tbodyTable');
        DOM.frmproducto = $('#frmproducto');
        DOM.caracTable = $('#caracTable');
        DOM.tbodyCriterioopcion = $('#tbodyCriterioopcion');
        DOM.txtcaracteristicanombre = $('#txtcaracteristicanombre');
        DOM.txtcaracteristicavalor = $('#txtcaracteristicavalor');
        DOM.btncaracteristicaagregar = $('#btncaracteristicaagregar');

        // FILTROS
        DOM.cmb_fil_tip = $("#cmb_fil_tip");
        DOM.txt_fil_pro_nom = $("#txt_fil_pro_nom");
        DOM.cbo_fil_marca = $("#cbo_fil_marca");
        DOM.cbo_fil_cat = $("#cbo_fil_cat");
        DOM.btn_filtrar = $('#btn_filtrar');
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
            DOM.tbodyCriterioopcion.html(tpl.criterioopcion(data.criterioopcionList));
            DOM.frmproducto.find('.nav-item:eq(0) button').tab('show');
            DOM.frmproducto.children('.modal-footer').find('input, button').attr('disabled', false);
            DOM.frmproducto.validate().resetForm();
            DOM.mdlProducto.find('.modal-title').text('Nuevo');
            document.getElementById('txtstock').disabled = false;
            oCsDropzone.clearFile();
        });

        DOM.frmproducto.validate({
            submitHandler: function () {
                guardar();
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

        DOM.tbodyCriterioopcion.on('change', 'input[type=checkbox]', function (ev) {
            cambiarCheckedCriterioopcion(this);
        });

        UtilNumber.setFormatNumberDecimal(document.getElementById('txtprecio'));
        UtilNumber.setFormatNumber(document.getElementById('txtstock'));

        // FILTROS
        DOM.cmb_fil_tip.on('change', function(){
            if(DOM.cmb_fil_tip.val()==1){
                DOM.txt_fil_pro_nom.attr("placeholder","Ingrese el código de barras");
            }else{
                DOM.txt_fil_pro_nom.attr("placeholder","Ingrese el nombre del producto");
            }
        });
        DOM.btn_filtrar.on('click', function (ev) {
            listar();
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

    function cambiarCheckedCriterioopcion(iCheckbox) {
        $(iCheckbox.parentNode.parentNode).find('select').attr('disabled', !iCheckbox.checked);
    }

    function guardar() {
        UtilNotification.loading('Guardando datos', 'Espere un momento, por favor...');
        DOM.frmproducto.children('.modal-footer').find('input, button').attr('disabled', true);

        let elementsForm = DOM.frmproducto[0].elements;

        new Ajxur.ApiPost({
            modelo: 'producto',
            metodo: 'guardar',
            data_in: {
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
            },
            data_files: {
                file: oCsDropzone.getFile(),
            }
        }, (xhr) => {
            if (xhr.status) {
                swal.fire('Éxito', xhr.message, 'success');
                DOM.mdlProducto.modal('hide');
                listar();
            } else {
                toastr.error(xhr.message);
                DOM.frmproducto.children('.modal-footer').find('input, button').attr('disabled', false);
                swal.close();
            }
        });
    }

    csGetFile = function () {
        return oCsDropzone.getFile();
    }

    function obtenerProductoCriterioopcionList() {
        let arrList = [];

        DOM.tbodyCriterioopcion.children().each((ind, trElement) => {
            let tdElements = trElement.children;
            if (tdElements[2].children.chkcriterioopcion.checked) {
                arrList.push(Number(tdElements[1].children.cbocriterioopcion.value));
            }
        });

        return arrList;
    }

    function obtenerProductoCaracteristicaList() {
        let arrList = [];

        DOM.caracTable.find('tr').each((ind, trElement) => {
            let tdElements = trElement.children;
            let nombre = String(tdElements[0].innerText).trim();
            let valor = String(tdElements[1].innerText).trim();

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
        send_ajxur_request('ApiGet', 'leer', function (xhr) {
            document.getElementById('txtstock').disabled = true;

            let xhrdata = xhr.data,
                elementsForm = DOM.frmproducto[0].elements,
                dataProductoCriterioopcionList = xhrdata.productoCriterioopcionList;

            UtilGlobal.setDataFormulario(elementsForm, xhrdata);
            elementsForm.hddid.value = id;
            elementsForm.cbocategoria.value = xhrdata.categoria.id;
            elementsForm.cbomarca.value = xhrdata.marca.id;

            DOM.caracTable.html(tpl.caracTable(xhrdata.productoCaracteristicaList));

            DOM.tbodyCriterioopcion.find('select').each((ind, selectElement) => {
                let valorOpcion = null;

                Array.from(selectElement.options).forEach(option => {
                    if (dataProductoCriterioopcionList.includes(Number(option.value))) {
                        valorOpcion = option.value;
                        return;
                    }
                });

                if (valorOpcion != null) {
                    selectElement.parentNode.nextElementSibling.children.chkcriterioopcion.checked = true;
                    selectElement.value = valorOpcion;
                    selectElement.disabled = false;
                }
            });

            oCsDropzone.setFile(xhrdata.imagen);

            DOM.mdlProducto.find('.modal-title').text('Editar');
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
        // send_ajxur_request('ApiGet', 'listar', function (xhr) {
        //     DOM.tbodyTable.html(tpl.table(xhr.data));
        // });
        new Ajxur.ApiGet({
			modelo: 'producto',
			metodo: 'listar',
			data_params: {
				tipo: DOM.cmb_fil_tip.val(),
				nombre: DOM.txt_fil_pro_nom.val(),
                idCategoria: DOM.cbo_fil_cat.val(),
                idMarca: DOM.cbo_fil_marca.val()
			}
		}, (xhr) => {
			DOM.tbodyTable.html(tpl.table(xhr.data));
		});
    }

    function cargarDatosExtra() {
        send_ajxur_request('ApiGet', 'cargarDatosExtra', function (xhr) {
            document.getElementById('cbocategoria').innerHTML = tpl.combo({ optionHolder: 'Seleccione', data: xhr.data.categoriaList });
            document.getElementById('cbomarca').innerHTML = tpl.combo({ optionHolder: 'Seleccione', data: xhr.data.marcaList });
            document.getElementById('cbo_fil_cat').innerHTML = tpl.combo({ optionHolder: 'Seleccione', data: xhr.data.categoriaList });
            document.getElementById('cbo_fil_marca').innerHTML = tpl.combo({ optionHolder: 'Seleccione', data: xhr.data.marcaList });
            data.criterioopcionList = xhr.data.criterioopcionList;
            DOM.tbodyCriterioopcion.html(tpl.criterioopcion(data.criterioopcionList));
        });
    }

    function send_ajxur_request(requestType, method, fnOk, data_in, data_out) {
        UtilGlobal.sendAjxurRequest('producto', requestType, method, fnOk, data_in, data_out);
    }

    init();
});