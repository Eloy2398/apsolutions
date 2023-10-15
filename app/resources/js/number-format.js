(function ($) {
	$.widget("ui.numberFormat", {
		options: {
			decimal: 0,
			min: null,
			max: null,
		},

		_create: function () {
			var options = this.options;

			$(this.element).addClass('ui-number-format');

			$(this.element).on('keypress', function (ev) {
				var cadena = ev.target.value;
				var tecla = (ev.which) ? ev.which : ev.keyCode;
				var key = cadena.length;
				var posicion = cadena.indexOf('.');
				var contador = 0;
				var numero = cadena.split(".");
				var resultado1 = numero[0];
				var suma = resultado1.length + options.decimal;

				while (posicion != -1) {
					contador++;
					posicion = cadena.indexOf('.', posicion + 1);
				}

				if ((tecla >= 48 && tecla <= 57) || (tecla == 46)) {
					if (tecla == 46 && (contador != 0 || key == 0)) {
						return false;
					}

					if (cadena == '0') {
						if (tecla >= 48 && tecla <= 57) {
							return false;
						}

						return true;
					}

					if (!(key <= suma)) {
						return false;
					}

					return true;
				}

				return false;

			}).on('change', function (ev) {
				var element = ev.target;
				var ceros = "000000000000000";
				var content = ceros.substring(0, options.decimal);

				if (element.value != '') {
					let cadena = element.value.split('.');

					if (cadena[1] == undefined) {
						content = (cadena[0] == "" ? '0.' : '.') + content;
					} else {
						content = ceros.substr(0, (options.decimal - cadena[1].length));
					}

					element.value += content;
				}
			});

			if (options.max !== null || options.min !== null) {
				$(this.element).on('keydown', function (ev) {
					var tecla = (ev.which) ? ev.which : ev.keyCode;
					if ((tecla >= 48 && tecla <= 57) || (tecla == 46)) {
						let inputValue = ev.target.value;

						if (inputValue == '') {
							inputValue = String.fromCharCode(tecla);
						} else {
							inputValue = parseFloat(String(inputValue) + String.fromCharCode(tecla));
						}

						if (options.max !== null) {
							if (inputValue > options.max) {
								return false;
							}
						} else {
							if (inputValue < options.min) {
								return false;
							}
						}
					}
				});
			}
		},

		enable: function () {
			$(this.element).attr('disabled', false);
		},

		disable: function () {
			$(this.element).attr('disabled', true);
		},

		destroy: function () {
			$.Widget.prototype.destroy.call(this);
		}
	});
})(jQuery);