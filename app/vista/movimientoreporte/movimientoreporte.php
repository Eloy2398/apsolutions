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

            <div class="card">
              <div class="card-header header-elements justify-content-between">

                <form class="col-12" id="frmCotizacionfiltro">
                  <div class="col-12 mb-3">
                    <div class="input-group input-group-sm">
                      <div class="col-1">
                        <label for="txt_fil_fec1" class="col-form-label">Fecha</label>
                      </div>
                      <div class="input-group-prepend">
                        <input class="form-control" name="txt_fil_fec1" type="text" id="txt_fil_fec1" value="<?php echo date('d-m-Y'); ?>" readonly>
                      </div>
                      <div class="input-group-prepend">
                        <label for="txt_fil_fec2" class="input-group-text" style="border-left: 0">-</label>
                      </div>
                      <div class="input-group-prepend">
                        <input class="form-control" name="txt_fil_fec2" type="text" id="txt_fil_fec2" value="<?php echo date('d-m-Y '); ?>" readonly>
                      </div>
                      <div class="col-1" style="margin-left: 15px;">
                        <label for="txt_fil_pro_nom" class="col-form-label">Producto</label>
                      </div>
                      <div class="input-group-prepend col-3">
                        <input type="hidden" name="hdd_pro_id" id="hdd_pro_id">
                        <input class="form-control" name="txt_fil_pro_nom" type="text" id="txt_fil_pro_nom" value="">
                      </div>
                      <div class="col-1" style="margin-left: 15px;">
                        <button class="btn btn-success" type="button" id="btn_filtrar">Filtrar</button>
                      </div>
                    </div>
                  </div>
                </form>

                <div class="card-title-elements">
                  <h5 class="card-title mb-0">Mis registros</h5>
                </div>
              </div>
              <div class="card-body table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>TIPO</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
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
                    <td>{{cantidad}}</td>
                    <td>{{precio}}</td>
                  </tr>
                {{/this}}
              </script>

            </div>

          </div>

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