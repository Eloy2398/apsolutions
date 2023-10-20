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

            <!-- Modal -->
            <div class="modal fade" id="mdlProveedor" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Nuevo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form id="frmproveedor">
                    <input type="hidden" name="hddid" id="hddid" value="">
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-12">
                          <label for="cbotipodocumento" class="form-label">Tipo Doc.</label>
                          <select name="cbotipodocumento" id="cbotipodocumento" class="form-control first-input">
                            <option value="DNI">DNI</option>
                            <option value="RUC">RUC</option>
                          </select>
                        </div>
                        <div class="col-12">
                          <label for="txtdocumento" class="form-label">Documento</label>
                          <input type="text" id="txtdocumento" name="txtdocumento" class="form-control first-input" required />
                        </div>
                        <div class="col-12">
                          <label for="txtnombre" class="form-label">Nombre</label>
                          <input type="text" id="txtnombre" name="txtnombre" class="form-control first-input" required />
                        </div>
                        <div class="col-12">
                          <label for="txtdireccion" class="form-label">Dirección</label>
                          <input type="text" id="txtdireccion" name="txtdireccion" class="form-control first-input" required />
                        </div>
                        <div class="col-12">
                          <label for="txttelefono" class="form-label">Telefono</label>
                          <input type="text" id="txttelefono" name="txttelefono" class="form-control first-input" />
                        </div>
                        <div class="col-12">
                          <label for="txtemail" class="form-label">Email</label>
                          <input type="text" id="txtemail" name="txtemail" class="form-control first-input" />
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
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#mdlProveedor"><i class="bx bx-plus"></i> Agregar</button>
              </div>
              <div class="card-body table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Tip. Doc.</th>
                      <th>Documento</th>
                      <th>Dirección</th>
                      <th>Email</th>
                      <th>Telefono</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0" id="div_table">
                    <script type="handlebars-x" id="tpl_table">
                      {{#this}}
                        <tr id="{{id}}">
                          <td>{{nombre}}</td>
                          <td>{{tipodocumento}}</td>
                          <td>{{documento}}</td>
                          <td>{{direccion}}</td>
                          <td>{{email}}</td>
                          <td>{{telefono}}</td>
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
  <script type="text/javascript">
    _.initialize('proveedor');
  </script>
</body>

</html>