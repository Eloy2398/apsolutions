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
            <div class="modal fade" id="mdlUsuario" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Nuevo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <input type="hidden" name="hdd_username" id="hdd_username" value="<?php echo $_SESSION["usuario"]['username'] ?>">
                  <form id="frmusuario">
                    <input type="hidden" name="hddid" id="hddid" value="">
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-12">
                          <label for="cboperfil" class="form-label">Perfil</label>
                          <select id="cboperfil" name="cboperfil" class="form-control" required></select>
                        </div>
                        <div class="col-12">
                          <label for="txtnombre" class="form-label">Nombre</label>
                          <input type="text" id="txtnombre" name="txtnombre" class="form-control first-input" required />
                        </div>
                        <div class="col-12">
                          <label for="txtusuario" class="form-label">Usuario</label>
                          <label for="chkmodusu" class="form-check-label d-none" id="chkusuario" style="float: inline-end;">
                            <input type="checkbox" name="chkmodusu" id="chkmodusu" value="1" class="form-check-input"> Modificar Usuario
                          </label>
                          <input type="text" id="txtusuario" name="txtusuario" class="form-control" required />
                        </div>
                        <div class="col-12">
                          <label for="txtclave" class="form-label">Clave</label>
                          <label for="chkmodpass" class="form-check-label d-none" id="chkclave" style="float: inline-end;">
                            <input type="checkbox" name="chkmodpass" id="chkmodpass" value="1" class="form-check-input"> Modificar Clave
                          </label>
                          <input type="password" id="txtclave" name="txtclave" class="form-control" required />
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
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#mdlUsuario"><i class="bx bx-plus"></i> Agregar</button>
              </div>
              <div class="card-body table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Nombre</th>
                      <th>Perfil</th>
                      <th class="text-center">Bloquear</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0" id="div_table">
                    <script type="handlebars-x" id="tpl_table">
                      {{#this}}
                        <tr id="{{id}}">
                          <td>{{usuario}}</td>
                          <td>{{nombre}}</td>
                          <td>{{perfilNombre}}</td>
                          <td align="center">
                            {{#if_ bloqueado '==' '1'}}
                              <button data-action="bloquear" type="button" class="btn btn-secondary btn-sm"><i class="bx bx-check me-1"></i> Desbloquear</button>
                              {{else}}
                                <button data-action="bloquear" type="button" class="btn btn-secondary btn-sm"><i class="bx bx-block me-1"></i> Bloquear</button>
                            {{/if_}}
                          </td>
                          <td class="text-center">
                            <button data-action="editar" data-bs-toggle="tooltip" data-bs-original-title="Editar" class="btn options"><i class="bx bx-edit-alt me-1"></i></button>
                            <button data-action="eliminar" data-perfilId="{{perfilId}}" data-bs-toggle="tooltip" data-bs-original-title="Eliminar" class="btn options"><i class="bx bx-trash me-1"></i></button>
                          </td>
                        </tr>
                      {{/this}}
                    </script>
                  </tbody>
                </table>
              </div>

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
  <script type="text/javascript" src="usuario.js"></script>
</body>

</html>