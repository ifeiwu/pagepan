<?php
return function () {
    try {
        // Include the captcha classes.
        loader_vendor();
        // Start a session.
        session_start();
        // Load the IconCaptcha options.
        $options = Config::file('iconcaptcha');
        // Create an instance of IconCaptcha.
        $captcha = new \IconCaptcha\IconCaptcha($options);
        // Handle the CORS preflight request.
        // * If you have disabled CORS in the configuration, you may remove this line.
        $captcha->handleCors();
        // Process the request.
        $captcha->request()->process();
        // Request was not supported/recognized.
        http_response_code(400);
    } catch (Throwable $ex) {
        http_response_code(500);
        debug($ex->getMessage());
    }
};