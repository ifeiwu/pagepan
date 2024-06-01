<?php
/**
 * 提交留言
 */
return function () {
	
	$data = post();

	// 安全令牌
	if ( ! helper('form/token', [$data['_token']]) ) {
        Response::error('invalid token！');
	} else {
	    unset($data['_token']);
	}
	
	// 必要数据
	if ( ! is_numeric($data['page_id']) ) {
        Response::error('invalid parameter！');
	}
	
	// 过滤表单数据
	$data = helper('filter/html', [$data]);
	
	// 保存数据
	foreach ($data as $key => $value) {
	    $data[$key] = is_array($value) ? json_encode($value) : $value;
	}
	
	$data['ctime'] = time();
	
	if ( db()->insert('message', $data) )
	{
        $config = Config::get('smtp');
	    $title = $data['title'] . ' - ' . Request::host();
	    $content = '<p>您的网站已收到来自用户提交的留言信息，请登录到网站后台查看详情！<p><p>提交日期：' . date('Y/m/d H:i') . '</p>';
        $mailer = new \Mailer($config);
        $mailer->setTitle($title);
        $mailer->setContent($content);
        $mailer->addAddress($config['address']);

        if ( $mailer->send() ) {
            Response::success();
        } else {
            Response::error('发送失败！');
        }
	}
	else
	{
        Response::error();
	}
};