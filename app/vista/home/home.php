<?php
require_once '../../config/init.php';

$oAccesoVista = new model\AccesoVista();
$oVista = $oAccesoVista->obtenerVista('default', ['highcharts', 'highcharts-3d', 'highcharts-theme-grid-light', 'highcharts-export-data']);

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <?php include_once '../../resources/complements/partials/head.php'; ?>
  <?php echo $oAccesoVista->cargarCss(); ?>
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

            <div class="row">
              <div class="col-lg-3 col-12 mb-3">
                <div class="card">
                  <div class="card-body">
                    <li class="d-flex pb-1">
                      <div class="avatar flex-shrink-0 me-3">
                        <span class="avatar-initial rounded bg-label-danger"><i class="bx bx-box"></i></span>
                      </div>
                      <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div class="me-2">
                          <small class="text-muted d-block mb-1"><a href="../producto/">Más información <i class="bx bx-chevron-right"></i></a></small>
                          <h6 class="mb-0">Productos</h6>
                        </div>
                        <div class="user-progress d-flex align-items-center gap-1">
                          <!-- <h6 class="mb-0">+82.6</h6> -->
                          <span class="text-muted" id="span-producto"></span>
                        </div>
                      </div>
                    </li>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-12 mb-3">
                <div class="card">
                  <div class="card-body">
                    <li class="d-flex pb-1">
                      <div class="avatar flex-shrink-0 me-3">
                        <span class="avatar-initial rounded bg-label-success"><i class="bx bx-group"></i></span>
                      </div>
                      <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div class="me-2">
                          <small class="text-muted d-block mb-1"><a href="../cliente/">Más información <i class="bx bx-chevron-right"></i></a></small>
                          <h6 class="mb-0">Clientes</h6>
                        </div>
                        <div class="user-progress d-flex align-items-center gap-1">
                          <!-- <h6 class="mb-0">+82.6</h6> -->
                          <span class="text-muted" id="span-cliente"></span>
                        </div>
                      </div>
                    </li>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-12 mb-3">
                <div class="card">
                  <div class="card-body">
                    <li class="d-flex pb-1">
                      <div class="avatar flex-shrink-0 me-3">
                        <span class="avatar-initial rounded bg-label-info"><i class="bx bx-group"></i></span>
                      </div>
                      <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div class="me-2">
                          <small class="text-muted d-block mb-1"><a href="../proveedor/">Más información <i class="bx bx-chevron-right"></i></a></small>
                          <h6 class="mb-0">Proveedores</h6>
                        </div>
                        <div class="user-progress d-flex align-items-center gap-1">
                          <!-- <h6 class="mb-0">+82.6</h6> -->
                          <span class="text-muted" id="span-proveedor"></span>
                        </div>
                      </div>
                    </li>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-12 mb-3">
                <div class="card">
                  <div class="card-body">
                    <li class="d-flex pb-1">
                      <div class="avatar flex-shrink-0 me-3">
                        <span class="avatar-initial rounded bg-label-primary"><i class="bx bx-list-check"></i></span>
                      </div>
                      <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div class="me-2">
                          <small class="text-muted d-block mb-1"><a href="../cotizacion/">Más información <i class="bx bx-chevron-right"></i></a></small>
                          <h6 class="mb-0">Cotizaciones</h6>
                        </div>
                        <div class="user-progress d-flex align-items-center gap-1">
                          <!-- <h6 class="mb-0">+82.6</h6> -->
                          <span class="text-muted" id="span-cotizacion"></span>
                        </div>
                      </div>
                    </li>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12 col-lg-6 mb-3">
                <div class="card">
                  <div class="card-body">
                    <div class="chart-container w-100" id="div_stock_productos"></div>
                  </div>
                  <div class="card-footer" id="card-footer-stockproducto">
                    <div class="text-center">
                      <select class="form-control form-control-sm w-auto d-inline-block text-uppercase" name="cbocategoria" id="cbocategoria">
                        <script type="handlebars-x" id="tpl_combo">
                          {{#if placeholder}}
                            <option value="">TODAS LAS CATEGORÍAS</option>
                          {{/if}}
                          {{#data}}
                            <option value="{{id}}">{{nombre}}</option>
                          {{/data}}
                        </script>
                      </select>
                      <select class="form-control form-control-sm w-auto d-inline-block" name="cboorden" id="cboorden">
                        <option value="1">ASC</option>
                        <option value="2">DESC</option>
                      </select>
                    </div>
                  </div>
                  <div class="spinner-border spinner-border-lg text-primary" role="status" style="position: absolute; top: 0; bottom: 0; right: 0; left: 0; margin: auto;" id="spinner-chart01">
                    <span class="visually-hidden">Cargando...</span>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <div class="card">
                  <div class="card-body">
                    <div class="chart-container w-100" id="div_cotizaciones"></div>
                  </div>
                  <div class="spinner-border spinner-border-lg text-primary" role="status" style="position: absolute; top: 0; bottom: 0; right: 0; left: 0; margin: auto;" id="spinner-chart02">
                    <span class="visually-hidden">Cargando...</span>
                  </div>
                </div>
              </div>
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
  <script src="home.vista.js" type="text/javascript"></script>
</body>

</html>