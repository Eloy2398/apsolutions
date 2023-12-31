<?php
require_once '../../config/init.php';

$oAccesoVista = new model\AccesoVista();
$oVista = $oAccesoVista->obtenerVista('default', ['controller', 'dropzone']);

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
            <div class="modal fade" id="mdlMarca" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Nuevo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form id="frmmarca">
                    <input type="hidden" name="hddid" id="hddid" value="">
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-12">
                          <label for="txtnombre" class="form-label">Nombre</label>
                          <input type="text" id="txtnombre" name="txtnombre" class="form-control first-input" required />
                        </div>
                        <div class="col-12 mt-2">
                          <div class="form-check">
                            <input type="checkbox" name="chkmosweb" id="chkmosweb" value="1" class="form-check-input">
                            <label for="chkmosweb" class="form-check-label">Mostrar en web</label>
                          </div>
                        </div>
                        <div class="col-12 mt-2">
                          <div class="form-check">
                            <input type="checkbox" name="chkmosdes" id="chkmosdes" value="1" class="form-check-input">Marcar como destacado</label>
                            <label for="chkmosdes" class="form-check-label">
                          </div>
                        </div>
                        <div class="col-12 mt-2">
                          <button type="button" class="btn btn-link" id="dzClickable">[ Adjuntar imagen <i class="bx bxs-file-find"></i> ]</button>
                        </div>

                        <div class="col-12">
                          <div id="previews">
                            <div id="template" class="row mt-2">
                              <div class="col-auto">
                                <span class="preview"><img src="data:," alt="" data-dz-thumbnail /></span>
                              </div>
                              <div class="col-6">
                                <div>
                                  <div>
                                    <p class="mb-0">
                                      <span class="lead" data-dz-name></span>
                                      (<span data-dz-size></span>)
                                    </p>
                                    <strong class="error text-danger" data-dz-errormessage></strong>
                                  </div>
                                  <div class="progress progress-striped active w-100" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                                    <div class="progress-bar progress-bar-success" style="width:0%;" data-dz-uploadprogress></div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-auto d-flex align-items-center">
                                <div class="btn-group btn-group-sm">
                                  <!-- <button class="btn btn-secondary start">
                                                    <i class="bx bx-upload"></i>
                                                </button> -->
                                  <!-- <button data-dz-remove class="btn btn-warning cancel">
                                                    <i class="bx bx-times-circle"></i>
                                                </button> -->
                                  <button data-dz-remove class="btn btn-danger delete">
                                    <i class="bx bx-trash"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
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
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#mdlMarca"><i class="bx bx-plus"></i> Agregar</button>
              </div>
              <div class="card-body table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0" id="div_table">
                    <script type="handlebars-x" id="tpl_table">
                      {{#this}}
                        <tr id="{{id}}">
                          <td>{{nombre}}</td>
                          <td class="text-center">
                            <button data-action="editar" data-bs-toggle="tooltip" data-bs-original-title="Editar" class="btn options"><i class="bx bx-edit-alt me-1"></i></button>
                            <button data-action="eliminar" data-bs-toggle="tooltip" data-bs-original-title="Eliminar" class="btn options"><i class="bx bx-trash me-1"></i></button>
                          </td>
                        </tr>
                      {{/this}}
                    </script>
                  </tbody>
                </table>
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

  <script type="text/javascript" src="marca.js"></script>
  <script type="text/javascript" src="../../resources/js/csDropzone.js"></script>
</body>

</html>