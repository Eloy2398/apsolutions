<?php
require_once '../../config/init.php';

$oAccesoVista = new model\AccesoVista();
$oVista = $oAccesoVista->obtenerVista('default', ['controller']);

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

            <!-- Modal form -->
            <?php include_once 'form.php'; ?>

            <div class="card">
              <div class="card-header header-elements justify-content-between">
                <div class="card-title-elements">
                  <h5 class="card-title mb-0">Mis registros</h5>
                </div>
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#mdlProducto"><i class="bx bx-plus"></i> Agregar</button>
              </div>
              <div class="card-body table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Marca</th>
                      <th class="text-end">Precio</th>
                      <th class="text-end">Stock</th>
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
                    <td>{{codigo}}</td>
                    <td>{{nombre}}</td>
                    <td>{{categoriaNombre}}</td>
                    <td>{{marcaNombre}}</td>
                    <td align="right">{{precio}}</td>
                    <td align="right">{{stock}}</td>
                    <td align="center">
                      <button data-action="editar" data-bs-toggle="tooltip" data-bs-original-title="Editar" class="btn options"><i class="bx bx-edit-alt me-1"></i></button>
                      <button data-action="eliminar" data-bs-toggle="tooltip" data-bs-original-title="Eliminar" class="btn options"><i class="bx bx-trash me-1"></i></button>
                    </td>
                  </tr>
                {{/this}}
              </script>

              <script type="handlebars-x" id="tpl_combo">
                <option value="">Seleccione</option>
                {{#this}}
                  <option value="{{id}}">{{nombre}}</option>
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

  <script type="text/javascript" src="producto.js"></script>
</body>

</html>