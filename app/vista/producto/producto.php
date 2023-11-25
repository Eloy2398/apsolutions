<?php
require_once '../../config/init.php';

$oAccesoVista = new model\AccesoVista();
$oVista = $oAccesoVista->obtenerVista('default', ['controller', 'util-number', 'dropzone']);

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

            <div class="card mb-2">
              <div class="card-body">
                <form id="frmProductofiltro" class="form-inline">
                  <div class="row">
                    <!-- filtrar por nombre -->
                    <div class="col-lg-auto col-12 mb-lg-0 mb-2">
                      <div class="input-group input-group-sm">
                        <label for="txt_fil_fec1" class="col-form-label me-2">Filtrar por</label>
                        <div class="input-group-append" style="width: 110px;">
                          <select class="form-control" name="cmb_fil_tip" id="cmb_fil_tip">
                            <option value="1">Código</option>
                            <option value="2">Nombre</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-auto col-12 mb-lg-0 mb-2">
                      <div class="input-group input-group-sm">
                        <div class="input-group-append">
                          <input class="form-control" name="txt_fil_pro_nom" type="text" id="txt_fil_pro_nom" placeholder="Ingrese el código de barras">
                        </div>
                      </div>
                    </div>
                    <!-- filtrar por marca -->
                    <div class="col-lg-auto col-12 mb-lg-0 mb-2">
                      <div class="input-group input-group-sm">
                        <label for="cbo_fil_marca" class="col-form-label me-2">Marca</label>
                        <div class="input-group-append">
                          <select id="cbo_fil_marca" name="cbo_fil_marca" class="form-control"></select>
                        </div>
                      </div>
                    </div>
                    <!-- Filtrar por categoria  -->
                    <div class="col-lg-auto col-12 mb-lg-0 mb-2">
                      <div class="input-group input-group-sm">
                        <label for="cbo_fil_cat" class="col-form-label me-2">Categoria</label>
                        <div class="input-group-append">
                          <select id="cbo_fil_cat" name="cbo_fil_cat" class="form-control"></select>
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-auto col-12 text-end">
                      <button class="btn btn-success" type="button" id="btn_filtrar">Filtrar</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

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

              <script type="handlebars-x" id="tpl_combo" partial="true">
                {{#if optionHolder}}
                  <option value="">{{optionHolder}}</option>
                {{/if}}
                {{#data}}
                  <option value="{{id}}">{{nombre}}</option>
                {{/data}}
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
  <script type="text/javascript" src="../../resources/js/csDropzone.js"></script>
</body>

</html>