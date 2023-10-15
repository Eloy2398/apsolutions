var UtilNumber = {
    TFloat: function (valor, digitos) {
        return parseFloat(valor).toFixed(!digitos ? 2 : digitos);
    },
    soloNumeros: function (event) {
        var tecla = (event.which) ? event.which : event.keyCode;
        if ((tecla >= 48 && tecla <= 57)) {
            return true;
        }
        return false;
    },
    soloNumerosDecimales: function (event) {
        var tecla = (event.which) ? event.which : event.keyCode;
        if (((tecla >= 48 && tecla <= 57) || tecla == 46)) {
            return true;
        }
        return false;
    },
    soloDecimal: function (event, mostrar) {
        var cadena = event.target.value;
        var tecla = (event.which) ? event.which : event.keyCode;
        var key = cadena.length;
        var posicion = cadena.indexOf('.');
        var contador = 0;
        var numero = cadena.split(".");
        var resultado1 = numero[0];
        var suma = resultado1.length + mostrar;
        while (posicion != -1) {
            contador++;
            posicion = cadena.indexOf('.', posicion + 1);
        }

        if ((tecla >= 48 && tecla <= 57) || (tecla == 46)) {
            // VERIFICAR QUE NO REPITA EL PUNTO Y ACEPTE SOLO DEL 0 AL 9
            if (tecla == 46 && (contador != 0 || key == 0)) {
                return false;
            }

            if (cadena == '0') { // EL SIGUIENTE ES PUNTO   
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
    },
    completarCeros: function (event, cantidad, isToNumber = true) {
        var $this = event.target;
        var ceros = "000000000000000";
        var content = ceros.substr(0, cantidad);

        if ($this.value != '') {
            if (isToNumber) {
                var cadena = $this.value.split('.');
                if (cadena[1] == undefined) {
                    content = (cadena[0] == "" ? '0.' : '.') + content;
                } else {
                    content = ceros.substr(0, (cantidad - cadena[1].length));
                }
            }
            $this.value += content;
        }
    },
    ToFormatNumber: function (number_format_string, digitos) {
        return this.TFloat(String(number_format_string).replace(',', ''), digitos);
    },
    ToFormatMoney: function (number_format, digitos) {
        var number = this.TFloat(number_format, digitos);
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    setFormatNumberDecimal: function (inputElement, parentElement = null, decimales = 2) {
        if (typeof parentElement === 'number' || parentElement == null) {
            if (typeof parentElement === 'number') decimales = parentElement;
            parentElement = inputElement;
            inputElement = null;
        }

        $(parentElement).on('keypress', inputElement, function (event) {
            return UtilNumber.soloDecimal(event, decimales);
        });

        if (decimales > 0) {
            $(parentElement).on('blur', inputElement, function (event) {
                if (!(this.value == '')) {
                    UtilNumber.completarCeros(event, decimales);
                }
            });
        }
    },
    setFormatNumber: function (inputElement, parentElement = null) {
        if (parentElement == null) {
            parentElement = inputElement;
            inputElement = null;
        }

        $(parentElement).on('keypress', inputElement, function (event) {
            return UtilNumber.soloNumeros(event);
        });
    }
};