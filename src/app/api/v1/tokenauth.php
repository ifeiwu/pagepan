<?php
class TokenAuth implements iAuthenticate {

    function __isAuthenticated() {
        // AJAX CORS Request Header
        $authorization = $_SERVER['HTTP_AUTHORIZATION'];
        if ( $authorization ) {
            if ( strpos($authorization, 'Bearer') === 0 ) {
                $token = substr($authorization, 7);
            }
        } else {
            $token = $_SERVER['HTTP_TOKEN'] ?: $_GET['token'];
        }

        return $token && $token == TokenAuth::key() ? TRUE : FALSE;
    }

    function key() {
        return require APP_PATH . 'api/token.php';
    }
}
