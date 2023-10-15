var UtilGlobal = {
    logout: function () {
        this.sendAjxurRequest('auth', 'ApiPost', 'logout', xhr => {
            $.post(path_controller + 'index.php', {
                action: 'destroy'
            }, function (response) {
                if (response.success) {
                    Ajxur.Ws.deleteToken();
                    window.location.href = '../';
                }
            }, 'json');
        });
    },
    soloLetras: function (event, espacio = null) {
        var tecla = (event.which) ? event.which : event.keyCode;
        if (espacio != null) {
            if ((tecla >= 65 && tecla <= 90) || (tecla >= 97 && tecla <= 122) || (tecla == 241) || (tecla == 209)) {
                return true;
            }
        } else {
            if ((tecla >= 65 && tecla <= 90) || (tecla >= 97 && tecla <= 122) || (tecla == 241) || (tecla == 209) || (tecla == 32)) {
                return true;
            }
        }
        return false;
    },
    tableCustom: function (table) {
        table.dataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "info": false,
            "autoWidth": false,
            "columnDefs": [{
                targets: 'no-sort',
                orderable: false
            }]
        });
    },
    tableDateCustom: function (table, typeorder = "asc") {
        table.dataTable({
            "columnDefs": [
                {
                    targets: 0,
                    render: $.fn.dataTable.render.moment('YYYY-MM-DD', 'DD-MM-YYYY')
                },
                {
                    targets: 'no-sort',
                    orderable: false
                }
            ],
            "order": [[0, typeorder]],
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "info": false,
            "autoWidth": false
        });
    },
    tableFixedHeader: function (table) {
        table.dataTable({
            "paging": false,
            "searching": false,
            "info": false,
            "ordering": false,
            "fixedHeader": true
        });
    },
    setDatepicker: function (strDOM) {
        $(strDOM).datepicker({
            // constrainInput: true,
            maxDate: '+0D',
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: 'dd-mm-yy'
        });
    },
    setDatepickerBetween: function (str_id_inputdateini, str_id_inputdatefin) {
        var dates = $(`#${str_id_inputdateini}, #${str_id_inputdatefin}`).datepicker({
            maxDate: "+0D",
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: "dd-mm-yy",
            onSelect: function (selectedDate) {
                var option = this.id == str_id_inputdateini ? 'minDate' : 'maxDate',
                    instance = $(this).data('datepicker'),
                    date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
                dates.not(this).datepicker('option', option, date);
            }
        });
    },
    setSelect2: function ($select, $value = null, $dropdownParent = null, $placeholder = 'Seleccione') {
        if ($select.hasClass('select2-hidden-accessible')) $select.select2('destroy');

        $select.select2({
            dropdownParent: $dropdownParent,
            placeholder: $placeholder,
            allowClear: true
        }).val($value).trigger('change');
    },
    activeFormTabEnterExtras: function ($elementContainer, element = 'td') {
        $elementContainer.on('keydown', '.form-control', function (event) {
            if (event.keyCode == 13) {
                var $parentElement = $(this).parents(element + ':eq(0)'), $nextElement = $parentElement.next();
                if ($nextElement.length == 0) {
                    $nextElement = $parentElement.parent().next();
                }

                if ($nextElement.find('.form-control:eq(0)').length == 1) {
                    $nextElement.find('.form-control:eq(0)').focus();
                }
                event.preventDefault();
            }
        });
    },
    activeFormTabEnter: function (tagForm, activeAction = true) {
        let array_forms = [];
        if (Array.isArray(tagForm) || (typeof tagForm === 'string' && tagForm.split(',').length > 1)) {
            if (!Array.isArray(tagForm)) tagForm = tagForm.trim().split(',');
            $.each(tagForm, function (index, val) {
                let pval = typeof val === 'string' ? val.trim() : val;
                let response = UtilGlobal.verifyTagForm(pval);
                if (response[0]) array_forms.push(response[1]);
            });
        } else {
            let response = this.verifyTagForm(tagForm);
            if (response[0]) array_forms.push(response[1]);
        }

        $.each(array_forms, function (index, item_form) {

            let newelementsForm = [];
            let elementsForm = item_form.find('input,textarea,select,button');

            elementsForm.each(function (index, element) {
                if (!(element.type == 'hidden' || element.disabled)) {
                    newelementsForm.push(element);
                }
            });

            $(newelementsForm).each(function (pos, element) {
                $(element).on('keydown', function (event) {
                    if (event.keyCode == 13) {
                        // if ($(this).hasClass('ui-autocomplete-input')) return false;

                        if (activeAction && (this.type == 'submit' || this.type == 'reset' || this.type == 'button')) {
                            $(this).click();
                        } else {
                            if ((pos + 1) < newelementsForm.length) newelementsForm[pos + 1].focus();
                        }

                        return false;
                    }
                });
            });
        });
    },
    verifyTagForm: function (p_tag) {
        var tagForm = p_tag;
        if (typeof tagForm === 'string') tagForm = $("#" + tagForm);
        if (tagForm != undefined && tagForm[0].tagName == "FORM") return [true, tagForm];
        return [false];
    },
    ucwords: function (str) {
        str = String(str).trim();

        if (str != '') {
            let arr_str = str.toLowerCase().split(' ');
            let arr_new = [];

            arr_str.forEach((iStr) => {
                if (['de', 'del', 'la', 'los'].includes(iStr)) {
                    arr_new.push(iStr);
                } else {
                    arr_new.push(iStr.substr(0, 1).toUpperCase() + iStr.substr(1));
                }
            });

            str = arr_new.join(' ');
        }

        return str;
    },
    Templater: function (scriptDOM) {
        var objTpl8 = {};
        $.each(scriptDOM, function (i, o) {
            var id = o.id, idName = id.substr(4);
            objTpl8[idName] = Handlebars.compile(o.innerHTML);
            if (o.attributes.partial) Handlebars.registerPartial(idName, o.innerHTML);
        });
        return objTpl8;
    },
    sendAjxurRequestIn: function (clazz, requestType, method, fnOk, data_in, fnErr) {
        this.sendAjxurRequest(clazz, requestType, method, fnOk, data_in, undefined, fnErr);
    },
    sendAjxurRequestOut: function (clazz, requestType, method, fnOk, data_out, fnErr) {
        this.sendAjxurRequest(clazz, requestType, method, fnOk, undefined, data_out, fnErr);
    },
    sendAjxurRequest: function (clazz, requestType, method, fnOk, data_in, data_out, fnErr) {
        new Ajxur[requestType]({
            modelo: clazz,
            metodo: method,
            data_in: data_in,
            data_out: data_out
        }, function (xhr) {
            if (xhr.status) {
                fnOk(xhr);
            } else {
                if (fnErr) {
                    fnErr(xhr.message);
                } else {
                    $('#frm' + clazz).children('.modal-footer').find('input, button').attr('disabled', false);
                    if (xhr.message && xhr.message != '') toastr.error(xhr.message);
                    swal.close();
                }
            }
        });
    },
    setDataFormularioStr: function (nForm, data, prefixLength = 0) {
        this.setDataFormulario(document.getElementById(nForm).elements, data, prefixLength);
    },
    setDataFormulario: function (elementsForm, data, prefixLength = 0) {
        let nEtiquetas = ['txt', 'cbo'];
        for (let name in data) {
            for (let index = 0; index < nEtiquetas.length; index++) {
                let nEtiqueta = nEtiquetas[index] + (name.search("id") == 0 ? name.substring(2) : name);
                if (elementsForm[nEtiqueta] == undefined) continue;
                elementsForm[nEtiqueta].value = data[name];
            }
        }
    },
    getRulesFormValidate$: function ($elementForm) {
        return this.getRulesElementsFormValidate($elementForm[0].elements);
    },
    getRulesFormValidate: function (elementForm) {
        return this.getRulesElementsFormValidate(elementForm.elements);
    },
    getRulesElementsFormValidate: function (elementsForm) {
        let objElementRules = {},
            arrRules = ['required', 'minlength', 'maxlength', 'max', 'min', 'email', 'url', 'equalTo'];

        $(elementsForm).each((pos, element) => {
            let objRules = {};

            let attributes = [].slice.call(element.attributes, 0);
            attributes.forEach((attr) => {
                if (arrRules.includes(attr.name)) {
                    if (attr.value != "") {
                        if (attr.value.includes('()')) {
                            objRules[attr.name] = window[attr.value.split('()')[0]];
                        } else {
                            objRules[attr.name] = isNaN(Number(attr.value)) ? attr.value : parseFloat(attr.value);
                        }
                    } else {
                        objRules[attr.name] = true;
                    }
                }
            });

            if (Object.keys(objRules).length > 0) {
                objElementRules[element.name] = objRules;
            }
        });

        return objElementRules;
    },
    submitFormValidate: function ($elementForm, fnSubmit, reqConfirmToSubmit = false) {
        $elementForm.validate({
            submitHandler: function (form) {
                if (reqConfirmToSubmit) {
                    UtilNotification.confirm((isConfirm) => {
                        if (isConfirm) fnSubmit();
                    });
                } else {
                    $(form).children('.modal-footer').find('input, button').attr('disabled', true);
                    UtilNotification.loading('Guardando datos', 'Espere un momento, por favor...');
                    fnSubmit();
                }
            },
            rules: UtilGlobal.getRulesFormValidate$($elementForm)
        });
    }
}