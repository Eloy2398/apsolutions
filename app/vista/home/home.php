<?php
require_once '../../config/init.php';

$oAccesoVista = new model\AccesoVista();
$oVista = $oAccesoVista->obtenerVista('default');

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

            <div class="card">
              <h5 class="card-header">Table Basic</h5>
              <div class="table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Client</th>
                      <th>Users</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                    <tr>
                      <td>
                        <i class="fab fa-angular fa-lg text-danger me-3"></i>
                        <span class="fw-medium">Angular Project</span>
                      </td>
                      <td>Albert Cook</td>
                      <td>
                        <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                          <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up" title="Lilian Fuller">
                            <img src="../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle" />
                          </li>
                          <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up" title="Sophia Wilkerson">
                            <img src="../assets/img/avatars/6.png" alt="Avatar" class="rounded-circle" />
                          </li>
                          <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up" title="Christina Parker">
                            <img src="../assets/img/avatars/7.png" alt="Avatar" class="rounded-circle" />
                          </li>
                        </ul>
                      </td>
                      <td><span class="badge bg-label-primary me-1">Active</span></td>
                      <td>
                        <div class="dropdown">
                          <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i class="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div class="dropdown-menu">
                            <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Edit</a>
                            <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i class="fab fa-vuejs fa-lg text-success me-3"></i>
                        <span class="fw-medium">VueJs Project</span>
                      </td>
                      <td>Trevor Baker</td>
                      <td>
                        <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                          <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up" title="Lilian Fuller">
                            <img src="../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle" />
                          </li>
                          <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up" title="Sophia Wilkerson">
                            <img src="../assets/img/avatars/6.png" alt="Avatar" class="rounded-circle" />
                          </li>
                          <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up" title="Christina Parker">
                            <img src="../assets/img/avatars/7.png" alt="Avatar" class="rounded-circle" />
                          </li>
                        </ul>
                      </td>
                      <td><span class="badge bg-label-info me-1">Scheduled</span></td>
                      <td>
                        <div class="dropdown">
                          <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i class="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div class="dropdown-menu">
                            <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-2"></i> Edit</a>
                            <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-trash me-2"></i> Delete</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>
                        <span class="fw-medium">Bootstrap Project</span>
                      </td>
                      <td>Jerry Milton</td>
                      <td>
                        <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                          <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up" title="Lilian Fuller">
                            <img src="../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle" />
                          </li>
                          <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up" title="Sophia Wilkerson">
                            <img src="../assets/img/avatars/6.png" alt="Avatar" class="rounded-circle" />
                          </li>
                          <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up" title="Christina Parker">
                            <img src="../assets/img/avatars/7.png" alt="Avatar" class="rounded-circle" />
                          </li>
                        </ul>
                      </td>
                      <td><span class="badge bg-label-warning me-1">Pending</span></td>
                      <td>
                        <div class="dropdown">
                          <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i class="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div class="dropdown-menu">
                            <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-2"></i> Edit</a>
                            <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-trash me-2"></i> Delete</a>
                          </div>
                        </div>
                      </td>
                    </tr>
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
  <!-- <script src="home.vista.js" type="text/javascript"></script> -->
</body>

</html>