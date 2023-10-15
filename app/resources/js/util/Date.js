var UtilDate = {
    getFechaSeteada: function (fecha = null, format = '') {
        var dt = fecha == null ? new Date : new Date(fecha),
            dia = dt.getDate(),
            mes = dt.getMonth() + 1,
            anio = dt.getFullYear();

        var numeros = this.concatenarCero([dia, mes]);

        return this.getFechaFormateada(format, numeros[0], numeros[1], anio);
    },
    formatearFecha: function (fecha, format) {
        var fecha = fecha.split(' ')[0].split(fecha.match('[-\/]')[0]);
        return this.formatearSoloFecha(fecha, format);
    },
    formatearFechaHora: function (fecha, format) {
        var arry_fecha = fecha.split(' ');
        return this.formatearSoloFecha(arry_fecha[0].split(fecha.match('[-\/]')[0]), format) + ' ' + arry_fecha[1];
    },
    formatearSoloFecha: function (fecha_split, format) {
        if (Array.isArray(fecha_split)) {
            var anio = fecha_split[2];
            var dia = fecha_split[0];

            if (String(anio).length != 4) {
                anio = fecha_split[0];
                dia = fecha_split[2];
            }

            return this.getFechaFormateada(format, dia, fecha_split[1], anio);
        }

        return null;
    },
    getFechaFormateada: function (format, dia, mes, anio) {
        format = format.toLowerCase();
        format = format.replace('d', dia);
        format = format.replace('m', mes);
        format = format.replace('y', anio);

        return format;
    },
    modificarFechaHora: function (fecha, c_modificar, tipo = 1, format = 'd-m-y', operacion = 1) {
        if (typeof fecha === 'string') fecha = new Date(fecha.replace('-', '/'));
        if (typeof fecha === 'object') {
            if (c_modificar == '') c_modificar = 0;
            c_modificar = String(c_modificar).split(':');
            var fn = tipo == 1 ? 'Date' : 'Hours';
            if (operacion == 1) {
                fecha['set' + fn](fecha['get' + fn]() + parseInt(c_modificar[0]));
                if (c_modificar[1] != undefined) fecha.setMinutes(fecha.getMinutes() + parseInt(c_modificar[1]));
            } else if (operacion == 2) {
                fecha['set' + fn](fecha['get' + fn]() - parseInt(c_modificar[0]));
                if (c_modificar[1] != undefined) fecha.setMinutes(fecha.getMinutes() - parseInt(c_modificar[1]));
            }

            var numeros = this.concatenarCero([fecha.getHours(), fecha.getMinutes(), fecha.getSeconds()]);

            return this.getFechaSeteada(fecha, format) + " " + numeros[0] + ":" + numeros[1] + ":" + numeros[2];
        }

        return '';
    },
    concatenarCero: function (numeros) {
        for (var i = 0; i < numeros.length; i++) {
            if (numeros[i] < 10) numeros[i] = "0" + numeros[i];
        }

        return numeros;
    }
}