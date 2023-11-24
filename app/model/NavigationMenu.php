<?php

namespace model;

class NavigationMenu
{
    private const ADMINISTRADOR = 1;
    private const VENDEDOR = 2;
    private $arr_menuperfil = [];

    function __construct($id_profile)
    {
        $this->setListMenuperfil($id_profile);
    }

    private function getListMenu()
    {
        return array(
            array('titulo' => 'Dashboard', 'icono' => 'bx-home-circle', 'url' => '../home/'),
            array('titulo' => 'Productos', 'icono' => 'bx-box', 'submenu' => [
                array('titulo' => 'Marcas', 'url' => '../marca/'),
                array('titulo' => 'Categorías', 'url' => '../categoria/'),
                array('titulo' => 'Criterios', 'url' => '../criterio/'),
                array('titulo' => 'Artículos', 'url' => '../producto/'),
            ]),
            array('titulo' => 'Movimientos', 'icono' => 'bx-table', 'url' => '../movimiento/'),
            array('titulo' => 'Cotizaciones', 'icono' => 'bx-list-check', 'url' => '../cotizacion/'),
            array('titulo' => 'Clientes', 'icono' => 'bx-group', 'url' => '../cliente/'),
            array('titulo' => 'Proveedores', 'icono' => 'bx-group', 'url' => '../proveedor/'),
            array('titulo' => 'Empresa', 'icono' => 'bx-cog', 'submenu' => [
                array('titulo' => 'Perfiles', 'url' => '../perfil/'),
                array('titulo' => 'Usuarios', 'url' => '../usuario/'),
                array('titulo' => 'Mi Perfil', 'url' => '../usuarioperfil/'),
            ]),
            array('titulo' => 'Reportes', 'icono' => 'bxs-report', 'submenu' => [
                array('titulo' => 'Cotizaciones', 'url' => '../cotizacionreporte/'),
                array('titulo' => 'Movimientos por producto', 'url' => '../movimientoreporte/'),
            ]),
        );
    }

    private function setListMenuperfil($id_profile)
    {
        $listMenu = $this->getListMenu();
        $listMenuperfil = $this->getArrMenuperfil($id_profile);

        if (count($listMenuperfil) == 1 && $listMenuperfil[0] == '*') {
            $this->arr_menuperfil = $listMenu;
        } else {
            foreach ($listMenu as $objMenu) {
                if (isset($objMenu['submenu'])) {
                    $sub_arr_menu = array();
                    foreach ($objMenu['submenu'] as $objSubMenu) {
                        if ($this->isValidMenu($objSubMenu['url'], $listMenuperfil)) {
                            array_push($sub_arr_menu, $objSubMenu);
                        }
                    }

                    if (count($sub_arr_menu) > 0) {
                        $objMenu['submenu'] = $sub_arr_menu;
                        array_push($this->arr_menuperfil, $objMenu);
                    }
                } else {
                    if ($this->isValidMenu($objMenu['url'], $listMenuperfil)) {
                        array_push($this->arr_menuperfil, $objMenu);
                    }
                }
            }
        }
    }

    private function isValidMenu($str_menu, $listMenuperfil)
    {
        $exp_menu = explode('/', $str_menu)[1];
        return in_array($exp_menu, $listMenuperfil) ? true : false;
    }

    private function getArrMenuperfil($id_profile)
    {
        if ($id_profile == self::ADMINISTRADOR) {
            return array('*');
        } elseif ($id_profile == self::VENDEDOR) {
            return array('home', 'marca', 'categoria', 'producto', 'movimiento', 'cliente');
        } else {
            array();
        }
    }

    public function getAll()
    {
        return $this->arr_menuperfil;
    }

    public function getOne($urlmenu)
    {
        foreach ($this->arr_menuperfil as $objMenu) {
            if (isset($objMenu['submenu'])) {
                foreach ($objMenu['submenu'] as $objSubMenu) {
                    if ($objSubMenu['url'] == $urlmenu) {
                        $objSubMenu['subtitulo'] = $objMenu['titulo'];
                        return $objSubMenu;
                    }
                }
            } else {
                if ($objMenu['url'] == $urlmenu) {
                    return $objMenu;
                }
            }
        }

        return array();
    }
}
