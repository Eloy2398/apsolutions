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

                        <div class="row">
                            <div class="col-md-12">
                                <ul class="nav nav-pills flex-column flex-md-row mb-3" id="ulvistas">
                                    <li class="nav-item">
                                        <button data-vista="modificar_usuario" class="nav-link active" type="button">
                                            <i class="bx bx-user me-1"></i> Modificar Usuario
                                        </button>
                                    </li>
                                    <li class="nav-item">
                                        <button data-vista="modificar_clave" class="nav-link" type="button">
                                            <i class="bx bx-key me-1"></i> Modificar Clave
                                        </button>
                                    </li>
                                </ul>

                                <!-- MODIFICAR USUARIO -->
                                <div class="card mb-4" id="div_modifyuser">
                                    <h5 class="card-header">Detalle del Perfil</h5>
                                    <div class="card-body">
                                        <div class="row gy-3">
                                            <div class="col-md">
                                                <div class="card">
                                                    <div class="d-flex align-items-start align-items-sm-center gap-4">
                                                        <img src="<?= SERVERURL; ?>resources/img/default/avatar.png" alt="user-avatar" class="d-block rounded" height="100" width="100" id="uploadedAvatar" />
                                                        <div class="button-wrapper">
                                                            <div class="flex-grow-1">
                                                                <span class="fw-medium d-block"><?= $_SESSION['usuario']['name']; ?></span>
                                                                <small class="text-muted"><?= $_SESSION['usuario']['name_profile']; ?></small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md">
                                                <div class="col-12">
                                                    <form id="frmusuario" method="post">
                                                        <label for="txtusuario" class="form-label">Usuario</label>
                                                        <input type="text" id="txtusuario" name="txtusuario" class="form-control mb-3" required />

                                                        <button type="submit" class="btn btn-primary">Guardar</button>
                                                        <button type="reset" class="btn btn-outline-danger">Cancelar</button>
                                                    </form>
                                                </div>
                                            </div>
                                            <div class="col-md"></div>
                                        </div>
                                    </div>
                                </div>
                                <!-- MODIFICAR CLAVE -->
                                <div class="card mb-4 d-none" id="div_modifypassword">
                                    <h5 class="card-header">Detalle del Perfil</h5>
                                    <div class="card-body">
                                        <div class="row gy-3">
                                            <div class="col-md">
                                                <div class="card">
                                                    <div class="d-flex align-items-start align-items-sm-center gap-4">
                                                        <img src="<?= SERVERURL; ?>resources/img/default/avatar.png" alt="user-avatar" class="d-block rounded" height="100" width="100" id="uploadedAvatar" />
                                                        <div class="button-wrapper">
                                                            <div class="flex-grow-1">
                                                                <span class="fw-medium d-block"><?= $_SESSION['usuario']['name']; ?></span>
                                                                <small class="text-muted"><?= $_SESSION['usuario']['name_profile']; ?></small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md">
                                                <div class="col-12">
                                                    <form id="frmclave">
                                                        <label for="txtclaveactual" class="form-label">Contraseña Actual</label>
                                                        <input type="password" id="txtclaveactual" name="txtclaveactual" class="form-control mb-2" required />
                                                        <label for="txtnuevaclave" class="form-label">Contraseña Nueva</label>
                                                        <input type="password" id="txtnuevaclave" name="txtnuevaclave" class="form-control mb-2" required />
                                                        <label for="txtrepetirclave" class="form-label">Repetir Contraseña</label>
                                                        <input type="password" id="txtrepetirclave" name="txtrepetirclave" class="form-control mb-3" required />
                                                        <button type="submit" class="btn btn-primary">Guardar</button>
                                                        <button type="reset" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancelar</button>
                                                    </form>
                                                </div>
                                            </div>
                                            <div class="col-md"></div>
                                        </div>
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
    <script type="text/javascript" src="usuarioperfil.js"></script>
</body>

</html>