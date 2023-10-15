(function (window, document) {
	'use strict';

	var object = function () {
		var $CLASS, IDVAL, reqConfirmToSave, tpl = {}, DOM = {};

		var fnProcess = {
			guardar: function (_accion_) {
				sendAjxurRequestApi('ApiPost', 'guardar', function (xhr) {
					swal.fire('Éxito', xhr.message, 'success');
					DOM.mdlFormulario.modal('hide');
					okListar();
				}, DOM.formulario.serialize(), 'formulario');
			},
			eliminar: function (_id_) {
				sendAjxurRequestApi('ApiPut', 'eliminar', function (xhr) {
					swal.fire('Éxito', xhr.message, 'success');
					okListar();
				}, undefined, [_id_]);
			},
			anular: function (_id_) {
				sendAjxurRequestApi('ApiPost', 'anular', function (xhr) {
					swal.fire('Éxito', xhr.message, 'success');
					okListar();
				}, { p_id: _id_ });
			},
			leerDatos: function (_id_) {
				sendAjxurRequestApi('ApiGet', 'leer', function (xhr) {
					let elementsForm = DOM.formulario[0].elements;
					UtilGlobal.setDataFormulario(elementsForm, xhr.data);
					if (elementsForm.cboestado) $(elementsForm.cboestado.parentNode).show();
					if (elementsForm[0].type == 'hidden') elementsForm[0].value = _id_;
					DOM.mdlFormulario.modal('show');
				}, undefined, [_id_]);
			},
			listar: function () {
				if (document.getElementById('frmFiltro') == null) {
					sendAjxurRequestApi('ApiGet', 'listar', function (xhr) {
						DOM.divTable.html(tpl.table(xhr.data));
						$('.overlay').addClass('d-none');
					});
				} else {
					sendAjxurRequestApi('ApiGet', 'listar', function (xhr) {
						DOM.divTable.html(tpl.table(xhr.data));
						$('.overlay').addClass('d-none');
					}, $('#frmFiltro').serialize(), 'formulario');
				}
			}
		}

		var sendAjxurRequestApi = function (requestType, method, fnOk, data_in, data_out) {
			UtilGlobal.sendAjxurRequest($CLASS, requestType, method, fnOk, data_in, data_out);
		}

		var okGuardar = function (form) {
			if (reqConfirmToSave == true) {
				UtilNotification.confirm(function (isConfirm) {
					if (isConfirm) fnProcess.guardar(IDVAL > 0 ? 'editar' : 'guardar');
				});
			} else {
				$(form).children('.modal-footer').find('input, button').attr('disabled', true);
				UtilNotification.loading('Guardando datos', 'Espere un momento, por favor...');
				fnProcess.guardar(IDVAL > 0 ? 'editar' : 'guardar');
			}
		}

		var okEliminar = function () {
			UtilNotification.confirm(function (isConfirm) {
				if (isConfirm) fnProcess.eliminar(IDVAL);
			}, "Confirmar", "¿Estás seguro de eliminar el registro?", "pregunta2");
		}

		var okAnular = function () {
			UtilNotification.confirm(function (isConfirm) {
				if (isConfirm) fnProcess.anular(IDVAL);
			}, "Confirmar", "¿Estás seguro de anular el registro?", "pregunta2");
		}

		var okLeerDatos = function () {
			fnProcess.leerDatos(IDVAL);
		}

		var okListar = function () {
			$('.overlay').removeClass('d-none');
			fnProcess.listar();
		}

		var libreria = {
			initialize: function ($pCLASS, activeTabEnter = true, executeOkListar = true, pReqConfirmToSave = false) {
				$CLASS = $pCLASS;
				reqConfirmToSave = pReqConfirmToSave;

				this.setDOM();
				this.setTemplates();
				this.setEvents(activeTabEnter);

				if (executeOkListar) okListar();
			},
			setDOM: function () {
				DOM.mdlFormulario = $('.modal:eq(0)');
				DOM.formulario = $('#frm' + $CLASS);
				DOM.divTable = $('#div_table');
			},
			setTemplates: function () {
				tpl = UtilGlobal.Templater($('script[type=handlebars-x]'));
			},
			setEvents: function (activeTabEnter) {
				DOM.formulario.validate({
					submitHandler: function (form) {
						okGuardar(form);
					},
					rules: UtilGlobal.getRulesFormValidate$(DOM.formulario)
				});

				DOM.mdlFormulario.on('shown.bs.modal', function (ev) {
					DOM.formulario.find('.first-input').focus();
				}).on('hidden.bs.modal', function (ev) {
					DOM.formulario.find('input[type=hidden]').val('');
					DOM.formulario.find('select[name=cboestado]').parent().hide();
					DOM.formulario[0].reset();
				}).on('hide.bs.modal', function (ev) {
					DOM.formulario.children('.modal-footer').find('input, button').attr('disabled', false);
					DOM.formulario.validate().resetForm();
					IDVAL = 0;
				}).on('show.bs.modal', function (ev) {
					libreria.setTitle();
				});

				DOM.divTable.on('click', '.options', function (event) {
					IDVAL = $(this).parents('tr')[0].id;
					if (IDVAL > 0) {
						let accion = $(this).data('action');
						if (accion == 'editar') okLeerDatos();
						if (accion == 'eliminar') okEliminar();
						if (accion == 'anular') okAnular();
					}
				});

				DOM.formulario.find('.number').keypress(function (event) {
					return UtilNumber.soloNumeros(event);
				});

				DOM.formulario.find('.money').keypress(function (event) {
					return UtilNumber.soloDecimal(event, 2);
				}).blur(function (event) {
					UtilNumber.completarCeros(event, 2);
				});

				DOM.formulario.find('.text-uppercase').change(function (event) {
					$(this).val(this.value.toUpperCase());
				});

				if (activeTabEnter) UtilGlobal.activeFormTabEnter(DOM.formulario);
			},
			loadDataExtra: function (p_object) {
				sendAjxurRequestApi('ApiGet', p_object.method, p_object.fn, p_object.parameters, p_object.parameters_out);
			},
			getTemplate: function (nTemplate) {
				return tpl[nTemplate];
			},
			serializeTemplate: function (name, data) {
				return libreria.getTemplate(name)(data);
			},
			setTitle: function (new_title) {
				DOM.mdlFormulario.find("h5.modal-title").html(new_title || (IDVAL > 0 ? "Editar" : "Nuevo"));
			},
			executeFunction() {
				if (arguments[0] == 'to_list') return okListar;
			},
			suscribeFunctionsCRUD(nFunction, fnReplace) {
				fnProcess[nFunction] = fnReplace;
			}
		}

		return libreria;
	}

	window.object = window._ = object();

})(window, document);