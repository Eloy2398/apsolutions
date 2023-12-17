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

    #ui-id-1>li>div>span:nth-child(1),
    #ui-id-2>li>div>span:nth-child(2) {
      width: 15%;
    }

    #ui-id-2>li>div>span:nth-child(2) {
      text-align: right;
    }

    #ui-id-1>li>div>span:nth-child(2),
    #ui-id-2>li>div>span:nth-child(1) {
      width: 85%;
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

            <!-- Modal form -->
            <?php include_once 'form.php'; ?>

            <div class="card">
              <div class="card-header header-elements justify-content-between">
                <div class="card-title-elements">
                  <h5 class="card-title mb-0">Mis registros</h5>
                </div>
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#mdlCotizacion"><i class="bx bx-plus"></i> Agregar</button>
              </div>
              <div class="card-body table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>DNI/RUC</th>
                      <th>Nombre</th>
                      <th class="text-center">Estado</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0" id="tbodyTable">
                  </tbody>
                </table>
              </div>

              <script type="handlebars-x" id="tpl_table">
                {{#this}}
                  <tr id="{{id}}">
                    <td>{{fecha}}</td>
                    <td>{{clienteDocumento}}</td>
                    <td>{{clienteNombre}}</td>
                    <td align="center">
                      {{#if estado}}
                        <span class="text-success">REGISTRADO</span>
                      {{else}}
                        <span class="text-danger">ANULADO</span>
                      {{/if}}
                    </td>
                    <td align="center">
                      <button data-action="editar" data-bs-toggle="tooltip" data-bs-original-title="Editar" class="btn options"><i class="bx bx-search-alt me-1"></i></button>
                      <!-- <button data-action="pdf" data-bs-toggle="tooltip" data-bs-original-title="PDF" class="btn options">PDF</button> -->
                      <button data-action="anular" data-bs-toggle="tooltip" data-bs-original-title="Anular" class="btn options"><i class="bx bx-block me-1"></i></button>
                    </td>
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

  <script type="text/javascript" src="cotizacion.js"></script>
</body>

</html>