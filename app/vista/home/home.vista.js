jQuery(function () {
	function cargarComboSucursal() {
		if (document.getElementById('cbosucursal') != null) {
			UtilGlobal.sendAjxurRequest(
				'sucursal',
				'ApiGet',
				'obtenerIdNombreTodos',
				(xhr) => document.getElementById('cbosucursal').innerHTML = _.serializeTemplate('combo', xhr.data)
			);
		}
	}

	_.initialize('caja');
	cargarComboSucursal();
});