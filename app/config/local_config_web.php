<?php
date_default_timezone_set("America/Lima");

// SERVIDOR
// define("SERVERURL", "http://192.168.30.9/sigesemp/app/");
define("SERVERURL", "http://localhost/apsolutions/app/");
// define("SERVERURL", "http://".IP_LOCAL."/sigesemp/app/");
// define("SERVERURL", $_SERVER['REQUEST_SCHEME'] . "://" . $_SERVER['SERVER_NAME'] . "/app/");
// define("IP_LOCAL", getHostByName(getHostName()));

// PATH
define("SITE_ROOT", str_replace('\config', '', __DIR__));
// define("SITE_ROOT", str_replace('/config', '', __DIR__));

// SESION
define("_SESION_", "_apsolutions_");
session_name(_SESION_);
session_start();
