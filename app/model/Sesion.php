<?php

namespace model;

use Firebase\JWT\JWT as JWTJWT;
use Firebase\JWT\Key;

class Sesion
{
    private const ENDPOINT = 'http://localhost:9091/api/';
    private const ACCESS_TOKEN_SECRET = "586E3272357538782F413F4428472B4B6250655368566B597033733676397924";

    private static function getAuthenticatedUser($token)
    {
        $ch = curl_init(self::ENDPOINT . 'usuario/getAuthenticatedUser');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Authorization: Bearer ' . $token
        ));

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            $error = 'Error: ' . curl_error($ch);
        }

        curl_close($ch);

        if (isset($error) || $response === false) {
            return array('success' => false, 'message' => $error ?? 'Error inesperado');
        }

        $response = json_decode($response, true);

        if (!$response['status']) {
            return array('success' => false, 'message' => $response['message']);
        }

        return array('success' => true, 'data' => $response['data']);
    }

    public static function init($token)
    {
        $response = self::getAuthenticatedUser($token);
        if (!$response['success']) return $response;

        // $decoded = JWTJWT::decode($token, new Key(self::ACCESS_TOKEN_SECRET, 'HS384'));
        // $decoded->id_profile
        // $decoded->sub

        $_SESSION["usuario"] = array(
            "token" => $token,
            "name" => $response['data']['nombre'],
            "username" => $response['data']['usuario'],
            "id_profile" => $response['data']['perfilId'],
            "name_profile" => $response['data']['perfilNombre'],
            "url_redirect" => (new NavigationMenu($response['data']['perfilId']))->getAll()[0]["url"]
        );

        return array('success' => true, 'data' => $_SESSION["usuario"]["url_redirect"]);
    }

    public static function destroy()
    {
        session_destroy();

        return array('success' => true);
    }
}
