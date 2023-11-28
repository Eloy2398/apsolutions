<?php
require_once '../../config/init.php';

$oAccesoVista = new model\AccesoVista();
$oVista = $oAccesoVista->obtenerVista('default', ['controller', 'util-number', 'util-array']);

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <?php include_once '../../resources/complements/partials/head.php'; ?>
  <?php echo $oAccesoVista->cargarCss(); ?>

  <style>
    .ui-autocomplete.ui-front {
      z-index: 9999;
    }

    ul.ui-menu.ui-widget.ui-widget-content>li>div>span {
      display: inline-block;
    }

    #ui-id-4>li>div>span:nth-child(1) {
      width: 25%;
    }

    #ui-id-4>li>div>span:nth-child(2) {
      width: 75%;
    }
  </style>
</head>

<body>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <?php include '../../resources/complements/partials/sidebar.php'; ?>

      <div class="layout-page">
        <?php include '../../resources/complements/partials/navbar.php'; ?>

        <div class="content-wrapper">
          <div class="container-xxl flex-grow-1 container-p-y">
            <?php include '../../resources/complements/partials/header.php'; ?>

            <div class="card mb-2">
              <div class="card-body">
                <form id="frmCotizacionfiltro" class="form-inline">
                  <div class="row">
                    <div class="col-lg-auto col-12 mb-lg-0 mb-2">
                      <div class="input-group input-group-sm">
                        <label for="txt_fil_fec1" class="col-form-label me-2">Fecha</label>
                        <div class="input-group-append" style="width: 110px;">
                          <input class="form-control" name="txt_fil_fec1" type="text" id="txt_fil_fec1" value="<?php echo date('d-m-Y'); ?>" readonly>
                        </div>
                        <div class="input-group-append ms-1" style="width: 110px;">
                          <input class="form-control" name="txt_fil_fec2" type="text" id="txt_fil_fec2" value="<?php echo date('d-m-Y '); ?>" readonly>
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-auto col-12 mb-lg-0 mb-2">
                      <div class="input-group input-group-sm">
                        <input type="hidden" name="hdd_pro_id" id="hdd_pro_id">
                        <label for="txt_fil_pro_nom" class="col-form-label me-2">Producto</label>
                        <div class="input-group-append">
                          <input class="form-control" name="txt_fil_pro_nom" type="text" id="txt_fil_pro_nom" value="">
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-auto col-12 text-end">
                      <button class="btn btn-info" type="button" id="btn_filtrar">Filtrar</button>
                      <button class="btn btn-success" type="button" id="btn_excel">Excel</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div class="card">
              <div class="card-body table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>TIPO</th>
                      <th class="text-end">Cantidad</th>
                      <th class="text-end">Precio</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0" id="tbodyTable">
                  </tbody>
                </table>
              </div>

              <script type="handlebars-x" id="tpl_table">
                {{#this}}
                  <tr id="{{idMovimiento}}">
                    <td>{{fecha}}</td>
                    <td>
                      {{#if_ tipooperacion '==' '1'}}
                        <span>INGRESO</span>
                        {{else}}
                          <span>EGRESO</span>
                      {{/if_}}
                    </td>
                    <td align="right">{{cantidad}}</td>
                    <td align="right">{{precio}}</td>
                  </tr>
                {{/this}}
              </script>

            </div>

          </div>

          <a id="downloadLink" style="display: none;"></a>

          <?php include '../../resources/complements/partials/pie.php'; ?>

        </div>
      </div>
    </div>

    <div class="layout-overlay layout-menu-toggle"></div>

    <!-- <div class="overlay-wrapper">
      <div class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i></div>
    </div> -->

  </div>
  <?php echo $oAccesoVista->cargarJs(); ?>

  <script type="text/javascript" src="movimientoreporte.js"></script>
</body>

</html>