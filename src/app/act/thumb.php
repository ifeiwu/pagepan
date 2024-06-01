<?php
/**
 * 生成缩略图片
 * <img src="img/data/file/bg/ad.png?w=500&h=200&fit=crop-center">
 */

require_once VEN_PATH . 'autoload.php';

use League\Glide\Signatures\SignatureFactory;
use League\Glide\Signatures\SignatureException;

return function ($name)
{
	try {
		$server = League\Glide\ServerFactory::create([
		    'source' => ROOT_PATH,
		    'cache' => ROOT_PATH . 'data/cache',
		]);
		
		$server->outputImage($name, $_GET);
	}
    catch (Exception $ex) {
        throw $ex;
	}
};