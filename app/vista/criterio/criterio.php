<?php
require_once '../../config/init.php';

$oAccesoVista = new model\AccesoVista();
$oVista = $oAccesoVista->obtenerVista('default', ['controller', 'util-number']);

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

            <!-- Modal -->
            <div class="modal fade" id="mdlCriterio" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Nuevo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form id="frmcriterio">
                    <input type="hidden" name="hddid" id="hddid" value="">
                    <div class="modal-body">
                      <div class="row mb-3">
                        <div class="col-12">
                          <label for="txtnombre" class="form-label">Nombre</label>
                          <input type="text" id="txtnombre" name="txtnombre" class="form-control first-input" required />
                        </div>
                        <div class="col-12">
                          <div class="form-group">
                            <label for="txtordenmostrar" class="form-label">Orden mostrar</label>
                            <input type="text" id="txtordenmostrar" name="txtordenmostrar" class="form-control first-input" required />
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="form-group">
                            <label for="txtnivelimportancia" class="form-label">Nivel importancia</label>
                            <input type="text" id="txtnivelimportancia" name="txtnivelimportancia" class="form-control first-input" min="1" max="10" required />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12">
                          <div class="input-group">
                            <div class="input-group-append">
                              <input type="text" class="form-control" name="txtopcionnombre" id="txtopcionnombre" placeholder="Ingrese opción">
                            </div>
                            <div class="input-group-append ms-2">
                              <button type="button" class="btn btn-outline-info" name="btnopcionagregar" id="btnopcionagregar">
                                <i class="bx bx-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="col-12">
                          <table class="table table-sm table-bordered mt-2" id="opcionTable">
                            <script type="handlebars-x" id="tpl_opcionTable">
                              {{#this}}
                                <tr>
                                  <td>{{descripcion}}</td>
                                  <td align="right">
                                    <i class="bx bx-trash"></i>
                                  </td>
                                </tr>
                              {{/this}}
                            </script>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                      <button type="submit" class="btn btn-primary">Guardar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header header-elements justify-content-between">
                <div class="card-title-elements">
                  <h5 class="card-title mb-0">Mis registros</h5>
                </div>
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#mdlCriterio"><i class="bx bx-plus"></i> Agregar</button>
              </div>
              <div class="card-body table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th class="text-center">Orden mostrar</th>
                      <th class="text-center">Nivel importancia</th>
                      <th>Opciones</th>
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
                    <td>{{nombre}}</td>
                    <td align="center">{{ordenMostrar}}</td>
                    <td align="center">{{nivelImportancia}}</td>
                    <td>
                      {{#each criterioopcionList}}
                        <span>- {{descripcion}}</span><br>
                      {{/each}}
                    </td>
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

  <script type="text/javascript" src="criterio.js"></script>
</body>

</html>