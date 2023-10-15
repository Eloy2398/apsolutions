<?php
require_once 'local_config_web.php';
require_once SITE_ROOT . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createMutable(SITE_ROOT . '/../');
$dotenv->load();
