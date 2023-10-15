var current_module = location.pathname.split('/').reverse()[1],
	path = '../../negocio/formatosImportar/',
	$elementsDOM = {},
	objectUpload = null,
	data = {
		file_execute_export: 'exportar_formato.php',
		file_execute_import: 'importar_formato.php',
		fnCallback: null,
		title_modal_name: '',
		fnLoadDataExtra: null
	};

function setElementsModalImport() {
	$elementsDOM.modal = $('#mdlImport');
	$elementsDOM.download = $elementsDOM.modal.find('a:eq(0)');
	$elementsDOM.upload = $elementsDOM.modal.find('a:eq(1)');
	$elementsDOM.header_title = $elementsDOM.modal.find('.modal-title');
	$elementsDOM.inputFileUpload = $elementsDOM.upload.find('input[type=file]');
	$elementsDOM.dropZoneImport = $elementsDOM.modal.find('#dropZoneImport');
	$elementsDOM.importationError = $elementsDOM.modal.find('#importationError');
	$elementsDOM.tbodyImportationError = $elementsDOM.importationError.find('#tbodyImportationError');
	$elementsDOM.import = $elementsDOM.modal.find('button:eq(1)');

	// $elementsDOM.download.attr('href', path + data.file_execute_export + '.xlsx');
	$elementsDOM.header_title.text('Importar ' + data.title_modal_name);
	$elementsDOM.importationError.find('th').css('padding', '2px');

	setEvents();
}

function setEvents() {
	$elementsDOM.download.attr('href', 'javascript:downloadImportFile()');

	if (typeof data.fnLoadDataExtra === 'function') data.fnLoadDataExtra();

	if ($elementsDOM.inputFileUpload.length === 0) {
		console.log('Input type file not found');
		return;
	}

	if ($elementsDOM.import.length === 0) {
		console.log('Button to import not found');
		return;
	}

	$elementsDOM.inputFileUpload.fileupload({
		url: path + 'import_fileupload.php',
		dataType: 'json',
		autoUpload: false,
		submit: function (e, f_data) {
			f_data.formData = {
				action: 'upload',
				module: current_module
			};
		},
		add: function (e, f_data) {
			objectUpload = f_data;
			var fileTypeAllowed = /.\.(xlsx|xls)$/i;
			var fileName = f_data.files[0].name;
			var fileSize = f_data.files[0].size;

			if (!fileTypeAllowed.test(fileName)) {
				toastr.error('Archivos permitidos: XLSX, XLS');
			} else {
				$elementsDOM.dropZoneImport.removeClass('d-none');
				$elementsDOM.dropZoneImport.html('<span class="text-muted">' + fileName + '</span>');
			}
		},
		send: function (e, f_data) {
			$elementsDOM.importationError.addClass('d-none');
			$elementsDOM.tbodyImportationError.html('');
			Swal.fire({
				title: "Importando datos",
				text: "Espere un momento...",
				showConfirmButton: false,
				didOpen: () => Swal.showLoading(),
			});
		},
		done: function (e, f_data) {
			if (f_data.result.status) {
				executeFileNameImport(f_data.result.fileNameImport);
			} else {
				toastr.error(f_data.result.message);
			}
		}
	});

	$elementsDOM.import.click(function (event) {
		if (objectUpload === null || objectUpload.fileInput.val() === "") {
			toastr.error('Seleccione un archivo a importar');
			return;
		}

		if (objectUpload.submit === undefined) {
			console.error('Función submit() no definida');
			return;
		}

		objectUpload.submit();
	});

	$elementsDOM.modal.on('hidden.bs.modal', function (event) {
		$elementsDOM.importationError.addClass('d-none');
		$elementsDOM.tbodyImportationError.html('');
		$elementsDOM.inputFileUpload.val('');
		$elementsDOM.dropZoneImport.html('');
		objectUpload = null;
	});
}

function executeFileNameImport(fExcel) {
	var datasend = {
		module: current_module,
		file_name_excel: fExcel,
		script_execute: data.file_execute_import
	}

	if ($('.extra-data-import .container-data-keyvalue').length > 0) {
		datasend.dataextra = {};
		$('.extra-data-import .container-data-keyvalue').each(function (index, el) {
			datasend.dataextra[el.children[1].name] = el.children[1].value;
		});
	}

	$.post(path + 'execute_import.php', datasend, function (xhrdata, textStatus, xhr) {
		if (xhrdata.invalid_parameters != undefined) {
			swal.close();
			toastr.error(xhrdata.msj);
			return;
		}

		if (xhrdata.errors == undefined) {
			Swal.fire({
				title: "Importación exitosa",
				text: `<span>${xhrdata.msj}</span><br><span>Filas insertadas: ${xhrdata.summary.total}</span>`,
				icon: xhrdata.type,
				html: true,
				showConfirmButton: true
			});
			data.fnCallback();
			$elementsDOM.modal.modal('hide');
		} else {
			$elementsDOM.importationError.removeClass('d-none');

			var errors = xhrdata.errors, template = ``;

			for (var i = 0; i < errors.length; i++) {
				var content = ``;

				for (var j = 0; j < errors[i].descriptions.length; j++) {
					content += `<span>${errors[i].descriptions[j]}</span><br>`;
				}

				template += `
					<tr>
						<td nowrap="nowrap" align="center">N° ${errors[i].fila}</td>
						<td>${content}</td>
					</tr>
				`;
			}

			$elementsDOM.tbodyImportationError.html(template);
			$elementsDOM.tbodyImportationError.find('td').css('line-height', '1');
			$elementsDOM.importationError.find('.opt-total').text(xhrdata.summary.total);
			$elementsDOM.importationError.find('.opt-success').text(xhrdata.summary.success);
			$elementsDOM.importationError.find('.opt-error').text(xhrdata.summary.error);

			swal.fire('Importación finalizada', xhrdata.msj, xhrdata.type);
			if (xhrdata.summary.success > 0) data.fnCallback();
		}
	}, 'json');
}

function downloadImportFile() {
	window.open(path + 'execute_export.php?script_execute=' + current_module + '/' + data.file_execute_export, '_blank');
}

function initDataImport(fnCallback, title_modal_name, fnLoadDataExtra = null) {
	data.fnCallback = fnCallback;
	data.title_modal_name = title_modal_name;
	data.fnLoadDataExtra = fnLoadDataExtra;

	setElementsModalImport();
}