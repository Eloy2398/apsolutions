<?php

namespace model;

use resources\complements\Plugins;

class AccesoVista
{
    private $oPlugins;
    private $oNavigationMenu;
    private $urlvistaactual;

    function __construct()
    {
        $this->validarAutenticacion();
        $this->setValores();
        $this->oNavigationMenu = new NavigationMenu($_SESSION["usuario"]["id_profile"]);
        $this->verificarAccesoUrl();
    }

    private function validarAutenticacion()
    {
        if (!isset($_SESSION["usuario"])) {
            exit(header("location:../"));
        }
    }

    private function verificarAccesoUrl()
    {
        if (count($this->oNavigationMenu->getOne($this->urlvistaactual)) == 0) {
            header("location:" . $_SESSION["usuario"]["url_redirect"] . "?");
        }
    }

    private function setValores()
    {
        $this->urlvistaactual = array_reverse(explode('/', $_SERVER['SCRIPT_FILENAME']))[1];
        $this->urlvistaactual = '../' . $this->urlvistaactual . '/';
    }

    private function obtenerMenuSidebar($arrNavigactionMenu)
    {
        $html_principal = '';
        $es_activo = false;

        foreach ($arrNavigactionMenu as $objMenu) {
            $arrSubNavigationMenu = isset($objMenu['submenu']) ? $objMenu['submenu'] : [];
            $response = $this->dibujarItemsMenu($objMenu, $arrSubNavigationMenu);
            $html_principal .= $response[0];
            if ($response[1] == true) $es_activo = $response[1];
        }

        return [$html_principal, $es_activo];
    }

    private function dibujarItemsMenu($objMenu, $arrSubNavigationMenu)
    {
        if (!isset($objMenu["url"])) {
            $objMenu["url"] = "#";
        }

        if (count($arrSubNavigationMenu) == 0) {
            $response = $this->dibujarItemUrlMenu($objMenu);
        } else {
            $response = $this->dibujarItemMenuPadre($objMenu);
        }

        return $response;
    }

    private function dibujarItemMenuPadre($objMenu)
    {
        $response = $this->obtenerMenuSidebar($objMenu['submenu']);
        $html_li = $response[0];

        $text_menu_open = $response[1] == true ? "open" : "";
        $text_active = $response[1] == true ? "active" : "";

        $html = '
			<li class="menu-item ' . $text_active . ' ' . $text_menu_open . '">
            	<a href="' . $objMenu["url"] . '" class="menu-link menu-toggle">
                	<i class="menu-icon tf-icons bx ' . $objMenu["icono"] . '"></i> 
                	<div data-i18n="' . $objMenu["titulo"] . '">' . $objMenu["titulo"] . '</div>
              	</a>
              	<ul class="menu-sub">
              		' . $html_li . '
              	</ul>
            </li>
		';

        return [$html, $response[1]];
    }

    private function dibujarItemUrlMenu($objMenu)
    {
        $es_activo = $this->urlvistaactual == $objMenu["url"];

        $html = '
			<li class="menu-item ' . ($es_activo ? "active" : "") . '">
            	<a href="' . $objMenu["url"] . '" class="menu-link">';

        if (isset($objMenu["icono"])) {
            $html .= '<i class="menu-icon tf-icons bx ' . $objMenu["icono"] . '"></i>';
        }

        $html .= ' 
                	<div data-i18n="' . $objMenu["titulo"] . '">' . $objMenu["titulo"] . '</div>
              	</a>
            </li>
		';

        return [$html, $es_activo];
    }

    public function obtenerSidebar()
    {
        return $this->obtenerMenuSidebar($this->oNavigationMenu->getAll())[0];
    }

    public function obtenerVista($arrScript_or_Type = "default", $arrScript_ext = null)
    {
        $this->oPlugins = new Plugins();
        $this->oPlugins->loadScripts($arrScript_or_Type, $arrScript_ext);

        return $this->oNavigationMenu->getOne($this->urlvistaactual);
    }

    public function cargarCss()
    {
        return $this->oPlugins->loadCss();
    }

    public function cargarJs()
    {
        return $this->oPlugins->loadJs();
    }
}
