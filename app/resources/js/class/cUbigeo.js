class cUbigeo {
	constructor($cbodepartment, $cboprovince, $cbodistrict, $dropdownParent = null) {
		var array_excel = [],
			code_department = '',
			code_province = '',
			code_district = '',
			self = this;

		var init = function () {
			_setTemplate();
			_setArrayUbigeo();
			_setEvents();
		}

		this.getDepartments = function () {
			return array_excel.departamentos;
		}

		this.getProvinces = function () {
			return array_excel.provincias;
		}

		this.getDistricts = function () {
			return array_excel.distritos;
		}

		this.setUbigeo = function (ubigeo) {
			code_department = ubigeo.substr(0, 2);
			code_province = ubigeo.substr(0, 4);
			code_district = ubigeo;

			if (array_excel.length == 0) return;
			setCbodepartments();
			// code_department = code_province = code_district = '';
		}

		var setCbodepartments = function () {
			$cbodepartment.html(self.tplcombo(array_excel.departamentos));
			UtilGlobal.setSelect2($cbodepartment, code_department, $dropdownParent);
		}

		var setCboprovinces = function (code) {
			$cboprovince.html(self.tplcombo(filter_ubigeo('provincias', code, 2)));
			UtilGlobal.setSelect2($cboprovince, code_province, $dropdownParent);
		}

		var setCbodistricts = function (code) {
			$cbodistrict.html(self.tplcombo(filter_ubigeo('distritos', code, 4)));
			UtilGlobal.setSelect2($cbodistrict, code_district, $dropdownParent);
		}

		var _setTemplate = function () {
			var templateHTML = `
				{{#this}}
					<option value="{{codigo}}">{{descripcion}}</option>
				{{/this}}
			`;

			self.tplcombo = Handlebars.compile(templateHTML);
		}

		var _setArrayUbigeo = function () {
			$.get(window.path_request, {
				type: 'ubigeo'
			}, function (response) {
				array_excel = response;
				setCbodepartments();
			}, 'json');
		}

		var _setEvents = function () {
			$cbodepartment.on('change', function (event) {
				setCboprovinces(this.value);
			});

			$cboprovince.on('change', function (event) {
				setCbodistricts(this.value);
			});

			if ($dropdownParent != null) {
				$dropdownParent.on('hide.bs.modal', function (event) {
					self.setUbigeo('');
				});
			}
		}

		var filter_ubigeo = function (name, code, length) {
			var filter_array = array_excel[name], new_array = [];

			for (var i = 0; i < filter_array.length; i++) {
				if (String(filter_array[i].codigo).slice(0, length) == code) {
					new_array.push(filter_array[i]);
				}
			}

			return new_array;
		}

		init();
	}
}