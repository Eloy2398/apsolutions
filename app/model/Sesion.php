<?php

namespace model;

use Firebase\JWT\JWT as JWTJWT;
use Firebase\JWT\Key;

class Sesion
{
    private const ACCESS_TOKEN_SECRET = "586E3272357538782F413F4428472B4B6250655368566B597033733676397924";

    public static function init($token)
    {
        $decoded = JWTJWT::decode($token, new Key(self::ACCESS_TOKEN_SECRET, 'HS384'));

        $_SESSION["usuario"] = array(
            "token" => $token,
            "id_profile" => $decoded->id_profile,
            "username" => $decoded->sub,
            "url_redirect" => (new NavigationMenu($decoded->id_profile))->getAll()[0]["url"]
        );

        return array('success' => true, 'data' => $_SESSION["usuario"]["url_redirect"]);
    }

    public static function destroy()
    {
        session_destroy();

        return array('success' => true);
    }
}
