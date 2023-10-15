<?php
require_once '../config/init.php';

use model\Sesion;

$response = array('success' => false);

if ($_POST['action'] == 'init') {
    $response = Sesion::init($_POST['token']);
} elseif ($_POST['action'] == 'destroy') {
    $response = Sesion::destroy();
} else {
    exit('Error');
}

exit(json_encode($response));
