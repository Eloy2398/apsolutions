class cFileupload {
    constructor($dropZone, execution_file_or_class, fileTypeAllowed, template, $fileuploadTag, pInitMethodHTML) {
        var execution_file = window.originfull + 'negocio/fileupload/fileupload_execute.php',
            modelClass = '',
            initMethodHTML = 'append';

        var init = function () {
            if (execution_file_or_class.indexOf('.') > -1) {
                execution_file = window.path_view + execution_file_or_class;
            } else {
                modelClass = execution_file_or_class;
            }

            if (!($fileuploadTag && $fileuploadTag != null)) {
                $fileuploadTag = $('#fileUpload');
            }

            if (pInitMethodHTML != null || pInitMethodHTML != '') {
                initMethodHTML = pInitMethodHTML;
            }

            initInputFileUpload();
            setEventsFileUpload();

            executeActionClean();
        }

        var initInputFileUpload = function () {
            $fileuploadTag.fileupload({
                url: execution_file,
                dataType: 'json',
                autoUpload: false,
                submit: function (e, data) {
                    data.formData = {
                        mClass: modelClass,
                        id: $(data.form[0]).find('input[type=hidden]').val()
                    };
                },
                add: function (e, data) {
                    var fileName = data.files[0].name;
                    var fileSize = data.files[0].size;
                    if (!RegExp('.(' + fileTypeAllowed.join('|') + ')$').test(fileName)) {
                        toastr.error('Archivos permitidos: ' + fileTypeAllowed.join(', ').toUpperCase());
                    } else if (fileSize > 2000000) {
                        toastr.error('Tamaño máximo 2MB');
                    } else {
                        data.submit();
                    }
                },
                done: function (e, data) {
                    if (data.result.rpt) {
                        setDataFilesUpload(initMethodHTML, data.result.data);
                    } else {
                        toastr.error(data.result.msj);
                    }
                }
            });
        }

        var setEventsFileUpload = function () {
            $dropZone.on('click', 'i[data-action=eliminar]', function (event) {
                executeActionDelete($(this));
            });

            Handlebars.registerHelper("obtenerUrl", function (data) {
                return new Handlebars.SafeString(obtenerUrl(data));
            });
        }

        var setExecuteAction = function (action, fnOk, idVal) {
            $.post(execution_file, {
                action: action,
                mClass: modelClass,
                id: idVal
            }, fnOk, 'json');
        }

        var executeActionClean = function () {
            setExecuteAction('vaciar', setDataFilesUpload('html'));
        }

        var executeActionDelete = function ($element) {
            setExecuteAction('eliminar', $element.parent().remove(), $element.attr('id'));
        }

        var setDataFilesUpload = function (methodHTML, imageData) {
            $dropZone[methodHTML](fnTemplate(imageData));
            $dropZone.css('display', imageData ? 'flex' : 'none');
            $dropZone[$dropZone.children().length > 4 ? 'addClass' : 'removeClass']('responsive');
        }

        var fnTemplate = function (data) {
            if (template && template != null) {
                return template(data);
            } else {
                var template_render = ``;

                if (Array.isArray(data)) {
                    data.forEach(item => {
                        template_render += renderTemplate(item);
                    });
                } else {
                    template_render = renderTemplate(data);
                }

                return template_render;
            }
        }

        var renderTemplate = function (oData) {
            if (oData && oData != null) {
                return `<div>
                    <img src="${obtenerUrl(oData)}">
                    <i class="fa fa-times" data-action="eliminar" data-title="Eliminar" id="${oData.id}"></i>
                </div>`;
            } else {
                return ``;
            }
        }

        var obtenerUrl = function (data) {
            return String(window.originfull + data.url);
        }

        this.showFiles = function (methodHTML, imageData) {
            setDataFilesUpload(methodHTML, imageData);
        };

        this.executeAction = function (action, fnOk, idVal) {
            setExecuteAction(action, fnOk, idVal);
        }

        init();
    }
}