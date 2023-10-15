if ($('#access_denied').val() == '?' && performance.getEntriesByType('navigation')[0].type == 'navigate') {
    toastr.error('No cuenta con acceso a la vista seleccionada.');
}

if (window.sidebar_collapse == 0) {
    $('.sidebar-mini').removeClass('sidebar-collapse');
}

$('.sidebar-mini').addClass('layout-fixed');

$('#frmFiltro').on('keydown', 'input[type=text]', function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});

if (document.getElementById('frmFiltro') != null) {
    $(document.getElementById('frmFiltro').parentNode.parentNode).removeClass('collapsed-card');
}

if ($.datepicker) {
    $.datepicker.regional['es'] = {
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá']
    }

    $.datepicker.setDefaults($.datepicker.regional['es']);
}

if ($.validator) {
    $.validator.setDefaults({
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });
}

if ($.fn.select2) {
    $.fn.select2.defaults.set('language', 'es');
}

if ($.fn.dataTable) {
    $.fn.dataTable.render.moment = function (from, to, locale) {
        if (arguments.length === 1) {
            locale = 'en';
            to = from;
            from = 'YYYY-MM-DD';
        } else if (arguments.length === 2) {
            locale = 'en';
        }

        return function (d, type, row) {
            var m = window.moment(d, from, locale, true);

            return m.format(type === 'sort' || type === 'type' ? 'x' : to);
        };
    }
}