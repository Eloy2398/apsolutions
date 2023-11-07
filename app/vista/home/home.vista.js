jQuery(function () {
	var lang_items_menu = {},
		buttons_items_menu = {},
		objTime = {},
		DOM = {};

	function init() {
		setDOM();
		setDataGlobal();
		setTemplates();
		setEvents();

		obtenerTotales();
		cargarFiltros();
	}

	function setDOM() {
		DOM.cbocategoria = $('#cbocategoria');
		DOM.cboorden = $('#cboorden');
	}

	function setTemplates() {
		tpl = UtilGlobal.Templater($('script[type=handlebars-x]'));
	}

	function setEvents() {
		DOM.cbocategoria.on('change', function (ev) {
			obtenerStockProductos(this.value, DOM.cboorden.val());
		});

		DOM.cboorden.on('change', function (ev) {
			obtenerStockProductos(DOM.cbocategoria.val(), this.value);
		});
	}

	function setDataGlobal() {
		lang_items_menu = {
			viewFullscreen: 'Ver en pantalla completa',
			printChart: 'Imprimir gráfico',
			downloadPNG: 'Descargar imagen PNG',
			downloadJPEG: 'Descargar imagen JPEG',
			downloadPDF: 'Descargar documento PDF',
			downloadSVG: 'Descargar imagen vectorial SVG',
			downloadCSV: 'Descargar CSV',
			downloadXLS: 'Descargar XLS',
			viewData: 'Ver tabla de datos'
		}

		buttons_items_menu = {
			buttons: {
				contextButton: {
					menuItems: Highcharts.defaultOptions.exporting.buttons.contextButton.menuItems.slice(0, 10)
					// menuItems: ['printChart']
				}
			}
		}

		objTime = {
			dia: { object: {}, array: [] },
			mes: { object: {}, array: [] },
		}

		let objDias = {
			monday: 'Lunes',
			tuesday: 'Martes',
			wednesday: 'Miércoles',
			thursday: 'Jueves',
			friday: 'Viernes',
			saturday: 'Sábado',
			sunday: 'Domingo',
		}

		let objMeses = {
			january: 'Enero',
			february: 'Febrero',
			march: 'Marzo',
			april: 'Abril',
			may: 'Mayo',
			june: 'Junio',
			july: 'Julio',
			august: 'Agosto',
			september: 'Setiembre',
			october: 'Octubre',
			november: 'Noviembre',
			dicember: 'Diciembre',
		}

		objTime.dia.object = objDias;
		objTime.mes.object = objMeses;

		for (let d in objDias) objTime.dia.array.push(objDias[d]);
		for (let m in objMeses) objTime.mes.array.push(objMeses[m]);
	}

	function parsearDataToChart(arrayData, attr) {
		let objTimeCheck = objTime[attr],
			dataArray = objTimeCheck.array,
			dataObject = objTimeCheck.object,
			arrayDataReturn = [];

		for (let i = 0; i < dataArray.length; i++) {
			let pos = -1;
			for (let j = 0; j < arrayData.length; j++) {
				if (dataObject[arrayData[j].datename.toLowerCase()] == dataArray[i]) pos = j;
			}
			arrayDataReturn.push(pos != -1 ? parseFloat(arrayData[pos].number) : null);
		}

		return { datatime: objTimeCheck, datashow: arrayDataReturn };
	}

	function obtenerTotales() {
		send_ajxur_request('totales', (xhr) => {
			for (let prop in xhr.data) {
				document.getElementById('span-' + prop).innerText = xhr.data[prop];
			}
		});
	}

	function cargarFiltros() {
		send_ajxur_request('filtros', (xhr) => {
			DOM.cbocategoria.html(tpl.combo({ data: xhr.data.categoriaList, placeholder: 'TODAS LAS CATEGORÍAS' }));

			obtenerStockProductos(DOM.cbocategoria.val(), DOM.cboorden.val());
			obtenerCotizaciones();
		});
	}

	function obtenerStockProductos(idCategoria, valOrden) {
		toggleSpinner('spinner-chart01', true);
		new Ajxur.ApiGet({
			modelo: 'indicador',
			metodo: 'stockproductos',
			data_params: {
				idCategoria: idCategoria,
				valOrden: valOrden,
			}
		}, (xhr) => {
			setGraficoStockProductos(xhr.data);
			toggleSpinner('spinner-chart01', false);
		});
	}

	function setGraficoStockProductos(arrayData) {
		Highcharts.chart('div_stock_productos', getOptionsChart('Stock de Productos', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Stock: <b>{point.y}</b><br>Inicial: <b>{point.initial}</b><br>Ingresos: <b>{point.income}</b><br>Salidas: <b>{point.output}</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					},
					showInLegend: false
				}
			},
			series: [{
				name: 'Porcentaje',
				colorByPoint: true,
				data: arrayData
			}]
		}));
	}

	function obtenerCotizaciones() {
		toggleSpinner('spinner-chart02', false);
		send_ajxur_request('cotizaciones', (xhr) => {
			let dataParser = parsearDataToChart(xhr.data.data, 'mes');
			setGraficoCotizaciones(dataParser.datatime.array, [{ name: xhr.data.name, data: dataParser.datashow, }]);
			toggleSpinner('spinner-chart02', false);
		});
	}

	function setGraficoCotizaciones(xAxisCategories, arraySeries) {
		Highcharts.chart('div_cotizaciones', getOptionsChart('Cotizaciones generadas', {
			chart: {
				type: 'line'
			},
			xAxis: {
				categories: xAxisCategories
			},
			yAxis: {
				title: {
					text: 'Total '
				}
			},
			plotOptions: {
				line: {
					dataLabels: {
						enabled: true,
						format: '{point.y:,.0f}'
					},
					enableMouseTracking: false
				}
			},
			series: arraySeries
		}));
	}

	function getOptionsChart(title, options) {
		let optionsChart = {
			lang: lang_items_menu,
			exporting: buttons_items_menu,
			title: {
				text: title
			},
		}

		for (let key in options) {
			optionsChart[key] = options[key];
		}

		return optionsChart;
	}

	function toggleSpinner(idElement, isShow) {
		document.getElementById(idElement).style.display = isShow ? 'inline-block' : 'none';
	}

	function send_ajxur_request(method, fnOk, data_in, data_out) {
		UtilGlobal.sendAjxurRequest('indicador', 'ApiGet', method, fnOk, data_in, data_out);
	}

	init();
});