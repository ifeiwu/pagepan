<?php
// 表单令牌
return function ($token = null) {
	// 验证令牌
	if ( $token ) {
		if ( session('form-token') !== $token ) {
		    return false;
		} else {
			return true;
		}
	} else {
        // 创建令牌
		$token = session('form-token');

		if ( $token ) {
			return $token;
		} else {
			$token = sha1(uniqid(mt_rand(), true));

			session('form-token', $token);

			return $token;
		}
	}
};