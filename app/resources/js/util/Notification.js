var UtilNotification = {
	alert: function ($placer, opt) {
		var html = '',
			typeAlert = '',
			iconAlert = '';

		if (!opt.tipo) {
			opt.tipo = 'd';
		}

		switch (opt.tipo) {
			case "s":
				typeAlert = "success";
				// iconAlert = "fa fa-check";
				break;
			case "w":
				typeAlert = "warning";
				// iconAlert = "fa fa-exclamation-triangle";
				break;
			case "d":
				typeAlert = "danger";
				// iconAlert = "fa fa-ban";
				break;
			case "i":
				typeAlert = "info";
				// iconAlert = "fa fa-info";
				break;
		}

		html += '<div class="alert alert-' + typeAlert + ' alert-dismissible" role="alert" style="margin-top: 5px; padding-right: unset;">';
		html += '<button type="button" class="btn-close" data-dismiss="alert" aria-hidden="true"></button>';
		html += (opt.titulo ? '<h6 class="mb-1"><i class="' + iconAlert + '"></i> ' + opt.titulo + '</h6>' : '') + '<span>' + (opt.mensaje ? opt.mensaje : '') + '</span></div>';
		$placer.html(html);
		$placer.focus();
		setTimeout(() => $placer.empty(), opt.tiempo || 2500);
	},
	notificacion: function (colorName, text, placementFrom, placementAlign, animateEnter, animateExit, delay) {
		if (colorName === null || colorName === '') { colorName = 'bg-black'; }
		if (text === null || text === '') { text = 'Turning standard Bootstrap alerts'; }
		if (animateEnter === null || animateEnter === '') { animateEnter = 'animated fadeInDown'; }
		if (animateExit === null || animateExit === '') { animateExit = 'animated fadeOutUp'; }
		if (delay === null || delay === '') { delay = 5000; }
		var allowDismiss = true;

		$.notify({
			message: text
		}, {
			type: colorName,
			allow_dismiss: allowDismiss,
			newest_on_top: true,
			timer: 1000,
			delay: delay,
			placement: {
				from: placementFrom,
				align: placementAlign
			},
			animate: {
				enter: animateEnter,
				exit: animateExit
			},
			template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? "p-r-35" : "") + '" role="alert">' +
				'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
				'<span data-notify="icon"></span> ' +
				'<span data-notify="title">{1}</span> ' +
				'<span data-notify="message">{2}</span>' +
				'<div class="progress" data-notify="progressbar">' +
				'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
				'</div>' +
				'<a href="{3}" target="{4}" data-notify="url"></a>' +
				'</div>'
		});
	},
	confirm: function (fnAccion, titulo, texto, nImagen, oIconType = null, esHTML = false) {
		let options = {
			title: (titulo || "Confirmar"),
			icon: oIconType,
			showCancelButton: true,
			confirmButtonColor: "#0d72c3",
			confirmButtonText: "Sí",
			cancelButtonColor: '#7c9099',
			cancelButtonText: "No",
			// closeOnConfirm: false,
			// closeOnCancel: true,
			imageUrl: window.path_img + "alert/" + (nImagen || "pregunta") + ".png",
			showLoaderOnConfirm: true,
			preConfirm: fnAccion
		};

		if (esHTML) {
			options.html = texto;
		} else {
			options.text = texto || "¿Estás seguro de guardar los datos?";
		}

		Swal.fire(options);
	},
	loading: function (title, text) {
		Swal.fire({
			title: title,
			text: text,
			showConfirmButton: false,
			didOpen: () => Swal.showLoading(),
		});
	},
	showSwal: function (title, text, iconType, timer) {
		Swal.fire({
			title: title,
			text: text,
			icon: iconType,
			showConfirmButton: false,
			timer: timer || 2000
		});
	},
	showSwalHTML: function (title, text, iconType) {
		Swal.fire({
			title: title,
			text: text,
			icon: iconType,
			html: true,
			showConfirmButton: true
		});
	},
	showToastr: function (message, type = 'success') {
		toastr[type](message);
	}
}