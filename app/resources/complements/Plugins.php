<?php

namespace resources\complements;

class Plugins
{
    private const NODE_MODULES = SERVERURL . '../node_modules/';
    private const RESOURCES = SERVERURL . 'resources/';
    private $strCss;
    private $strJs;

    function __construct()
    {
        $this->strCss = "";
        $this->strJs = "";
    }

    public function loadScripts($arrScript_or_Type, $arrScript_ext = null)
    {
        if (is_string($arrScript_or_Type)) {
            if ($arrScript_or_Type == 'default') {
                $arrScript = array(
                    'font',
                    'favicon',
                    'fontawesome',
                    // 'jquery',
                    'adminlte',
                    'jquery-ui',
                    'jquery-validation',
                    'handlebars',
                    'ajxur',
                    'util',
                    'util-notification',
                    // 'bootstrap',
                    'sweetalert',
                    'toastr',
                    'estilos',
                );
            } elseif ($arrScript_or_Type == 'print') {
                $arrScript = array(
                    'favicon',
                    'adminlte',
                    'estilos-print',
                );
            }

            if (is_array($arrScript_ext)) {
                $arrScript = array_merge($arrScript, $arrScript_ext);
            }

            array_push($arrScript, 'config');
        } else {
            $arrScript = $arrScript_or_Type;
        }

        $this->processLoadScripts($arrScript);
    }

    public function processLoadScripts($arrScript)
    {
        foreach ($arrScript as $value) {
            switch ($value) {
                case 'font':
                    $this->strCss .= "<link rel='preconnect' href='https://fonts.googleapis.com'><link rel='preconnect' href='https://fonts.gstatic.com' crossorigin><link href='https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap' rel='stylesheet'>";
                    break;

                case 'favicon':
                    $this->strCss .= "<link rel='shortcut icon' href='" . self::RESOURCES . "img/default/favicon.ico' type='image/x-icon' />";
                    break;

                case 'adminlte':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::RESOURCES . "adminlte/dist/css/demo.css' type='text/css' />";
                    $this->strCss .= "<link rel='stylesheet' href='" . self::RESOURCES . "adminlte/dist/vendor/css/core.css' type='text/css' />";
                    $this->strCss .= "<link rel='stylesheet' href='" . self::RESOURCES . "adminlte/dist/vendor/css/theme-default.css' type='text/css' />";
                    $this->strCss .= "<link rel='stylesheet' href='" . self::RESOURCES . "adminlte/dist/vendor/libs/perfect-scrollbar/perfect-scrollbar.css' type='text/css' />";
                    $this->strJs .= "<script src='" . self::RESOURCES . "adminlte/dist/vendor/js/helpers.js' type='text/javascript'></script>";
                    $this->strJs .= "<script src='" . self::RESOURCES . "adminlte/dist/js/config.js' type='text/javascript'></script>";
                    $this->strJs .= "<script src='" . self::RESOURCES . "adminlte/dist/vendor/libs/jquery/jquery.js' type='text/javascript'></script>";
                    $this->strJs .= "<script src='" . self::RESOURCES . "adminlte/dist/vendor/js/bootstrap.js' type='text/javascript'></script>";
                    $this->strJs .= "<script src='" . self::RESOURCES . "adminlte/dist/vendor/libs/perfect-scrollbar/perfect-scrollbar.js' type='text/javascript'></script>";
                    $this->strJs .= "<script src='" . self::RESOURCES . "adminlte/dist/vendor/js/menu.js' type='text/javascript'></script>";
                    $this->strJs .= "<script src='" . self::RESOURCES . "adminlte/dist/js/main.js' type='text/javascript'></script>";
                    break;

                case 'bootstrap':
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "bootstrap/dist/js/bootstrap.bundle.min.js' type='text/javascript'></script>";
                    break;

                case 'config':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::RESOURCES . "complements/css/config.css' type='text/css' />";
                    $this->strJs .= "<script src='" . self::RESOURCES . "complements/js/config.js' type='text/javascript'></script>";
                    break;

                case 'colorpicker-bootstrap':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::NODE_MODULES . "bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css' type='text/css' />";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js' type='text/javascript'></script>";
                    break;

                case 'estilos':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::RESOURCES . "css/estilos.css' type='text/css' />";
                    break;

                case 'estilos-print':
                    $this->strCss .= "<style type='text/css'> table tbody tr td span.ANULADO { color: #dc3545; } table tbody tr td span.REGISTRADO { color: #28a745; } </style>";
                    break;

                case 'datatables':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::NODE_MODULES . "datatables.net-dt/css/jquery.dataTables.min.css' type='text/css' />";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "datatables.net/js/jquery.dataTables.min.js' type='text/javascript'></script>";
                    break;

                case 'datatables-fixedheader':
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "datatables.net-fixedheader/dataTables.fixedHeader.min.js' type='text/javascript'></script>";
                    break;

                case 'dropzone':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::NODE_MODULES . "dropzone/dist/dropzone.css' type='text/css' />";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "dropzone/dist/dropzone-min.js' type='text/javascript'></script>";
                    break;

                case 'fontawesome':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::NODE_MODULES . "boxicons/css/boxicons.min.css' type='text/css' />";
                    break;

                case 'fileupload':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::NODE_MODULES . "@formcentric/jquery-file-upload/css/jquery.fileupload.css' type='text/css' />";
                    $this->strCss .= "<link rel='stylesheet' href='" . self::NODE_MODULES . "@formcentric/jquery-file-upload/css/jquery.fileupload-ui.css' type='text/css' />";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "@formcentric/jquery-file-upload/js/vendor/jquery.ui.widget.js' type='text/javascript'></script>";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "@formcentric/jquery-file-upload/js/jquery.fileupload.js' type='text/javascript'></script>";
                    break;

                case 'fileupload-transport':
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "@formcentric/jquery-file-upload/js/jquery.iframe-transport.js' type='text/javascript'></script>";
                    break;

                case 'handlebars':
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "handlebars/dist/handlebars.min.js' type='text/javascript'></script>";
                    $this->strJs .= "<script src='" . self::RESOURCES . "js/handlebars.js' type='text/javascript'></script>";
                    break;

                case 'highcharts':
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "highcharts/highcharts.js' type='text/javascript'></script>";
                    break;

                case 'highcharts-3d':
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "highcharts/highcharts-3d.js' type='text/javascript'></script>";
                    break;

                case 'highcharts-cylinder':
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "highcharts/modules/cylinder.js' type='text/javascript'></script>";
                    break;

                case 'highcharts-drilldown':
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "highcharts/modules/drilldown.js' type='text/javascript'></script>";
                    break;

                case 'highcharts-export-data':
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "highcharts/modules/exporting.js' type='text/javascript'></script>";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "highcharts/modules/export-data.js' type='text/javascript'></script>";
                    break;

                case 'highcharts-theme-grid-light':
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "highcharts/themes/grid-light.js' type='text/javascript'></script>";
                    break;

                case 'icheck':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::NODE_MODULES . "icheck/skins/all.css' >";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "icheck/icheck.min.js' type='text/javascript'></script>";
                    break;

                case 'inputmask':
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "inputmask/dist/jquery.inputmask.min.js' type='text/javascript'></script>";
                    break;

                case 'jquery':
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "jquery/dist/jquery.min.js' type='text/javascript'></script>";
                    break;

                case 'jquery-ui':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::NODE_MODULES . "jquery-ui/dist/themes/base/jquery-ui.min.css' type='text/css' />";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "jquery-ui/dist/jquery-ui.min.js' type='text/javascript'></script>";
                    break;

                case 'jquery-timepicker':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::NODE_MODULES . "jquery-timepicker/jquery.timepicker.css' type='text/css' />";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "jquery-timepicker/jquery.timepicker.js' type='text/javascript'></script>";
                    break;

                case 'jquery-validation':
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "jquery-validation/dist/jquery.validate.min.js' type='text/javascript'></script>";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "jquery-validation/dist/additional-methods.min.js' type='text/javascript'></script>";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "jquery-validation/dist/localization/messages_es_PE.min.js' type='text/javascript'></script>";
                    break;

                case 'moment':
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "moment/moment.js' type='text/javascript'></script>";
                    break;

                case 'push':
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "push.js-master/bin/push.min.js' type='text/javascript'></script>";
                    break;

                case 'select2':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::NODE_MODULES . "select2/dist/css/select2.min.css' type='text/css' />";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "select2/dist/js/select2.full.min.js' type='text/javascript'></script>";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "select2/dist/js/i18n/es.js' type='text/javascript'></script>";
                    break;

                case 'sweetalert':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::NODE_MODULES . "sweetalert2/dist/sweetalert2.min.css' type='text/css' />";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "sweetalert2/dist/sweetalert2.min.js' type='text/javascript'></script>";
                    break;

                case 'summernote':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::NODE_MODULES . "summernote/dist/summernote-bs4.css' type='text/css' />";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "summernote/dist/summernote-bs4.min.js' type='text/javascript'></script>";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "summernote/dist/lang/summernote-es-ES.min.js' type='text/javascript'></script>";
                    break;

                case 'switch-bootstrap':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::NODE_MODULES . "bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css' type='text/css' />";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "bootstrap-switch/dist/js/bootstrap-switch.min.js' type='text/javascript'></script>";
                    break;

                case 'toastr':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::NODE_MODULES . "toastr/build/toastr.min.css' type='text/css' />";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "toastr/build/toastr.min.js' type='text/javascript'></script>";
                    break;

                case 'tooltipster':
                    $this->strCss .= "<link rel='stylesheet' href='" . self::NODE_MODULES . "tooltipster/dist/css/tooltipster.bundle.min.css' type='text/css' />";
                    $this->strJs .= "<script src='" . self::NODE_MODULES . "tooltipster/dist/js/tooltipster.bundle.min.js' type='text/javascript'></script>";
                    break;

                case 'ajxur':
                    $this->strJs .= "<script src='" . self::RESOURCES . "js/Ajxur.js' type='text/javascript'></script>";
                    break;

                case 'controller':
                    $this->strJs .= "<script src='" . self::RESOURCES . "js/controller.js' type='text/javascript'></script>";
                    break;

                case 'fileupload-import':
                    $this->strJs .= "<script src='" . self::RESOURCES . "js/import_fileupload.js' type='text/javascript'></script>";
                    break;

                case 'show-columns-table':
                    $this->strJs .= "<script src='" . self::RESOURCES . "js/show_columns_table.js' type='text/javascript'></script>";
                    break;

                case 'socket':
                    $this->strJs .= "<script src='" . self::RESOURCES . "js/util/socket.js' type='text/javascript'></script>";
                    break;

                case 'util':
                    $this->strJs .= "<script src='" . self::RESOURCES . "js/util/Global.js' type='text/javascript'></script>";
                    break;

                case 'util-date':
                    $this->strJs .= "<script src='" . self::RESOURCES . "js/util/Date.js' type='text/javascript'></script>";
                    break;

                case 'util-array':
                    $this->strJs .= "<script src='" . self::RESOURCES . "js/util/Array.js' type='text/javascript'></script>";
                    break;

                case 'util-notification':
                    $this->strJs .= "<script src='" . self::RESOURCES . "js/util/Notification.js' type='text/javascript'></script>";
                    break;

                case 'util-number':
                    $this->strJs .= "<script src='" . self::RESOURCES . "js/util/Number.js' type='text/javascript'></script>";
                    $this->strJs .= "<script src='" . self::RESOURCES . "js/number-format.js' type='text/javascript'></script>";
                    break;

                case 'apidoc':
                    $this->strJs .= "<script src='" . self::RESOURCES . "js/class/Apidoc.js' type='text/javascript'></script>";
                    break;

                case 'classUbigeo':
                    $this->strJs .= "<script src='" . self::RESOURCES . "js/class/cUbigeo.js' type='text/javascript'></script>";
                    break;

                case 'classFileupload':
                    $this->strJs .= "<script src='" . self::RESOURCES . "js/class/cFileupload.js' type='text/javascript'></script>";
                    break;

                case 'phpmailer':
                    $this->strJs .= "<script src='" . self::RESOURCES . "js/class/PHPMailer.js' type='text/javascript'></script>";
                    break;
            }
        }
    }

    public function loadCss()
    {
        return $this->strCss;
    }

    public function loadJs()
    {
        return $this->strJs;
    }
}
