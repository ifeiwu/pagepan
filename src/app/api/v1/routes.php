<?php $o=array();



############### GET ###############

$o['GET']=array();

#==== GET tokenauth/key

$o['GET']['tokenauth/key']=array (
	  'class_name' => 'TokenAuth',
	  'method_name' => 'key',
	  'arguments' => 
	  array (
	  ),
	  'defaults' => 
	  array (
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 0,
	);

#==== GET api/v1/admin/one

$o['GET']['api/v1/admin/one']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/admin/one/:id

$o['GET']['api/v1/admin/one/:id']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/admin/one/:id/:column

$o['GET']['api/v1/admin/one/:id/:column']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/admin/find

$o['GET']['api/v1/admin/find']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/admin/find/:id

$o['GET']['api/v1/admin/find/:id']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/admin/find/:id/:columns

$o['GET']['api/v1/admin/find/:id/:columns']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/site/all

$o['GET']['api/v1/site/all']=array (
	  'class_name' => 'Site',
	  'method_name' => 'getAll',
	  'arguments' => 
	  array (
	  ),
	  'defaults' => 
	  array (
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/site/runtime

$o['GET']['api/v1/site/runtime']=array (
	  'class_name' => 'Site',
	  'method_name' => 'getRuntime',
	  'arguments' => 
	  array (
	  ),
	  'defaults' => 
	  array (
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/item/one

$o['GET']['api/v1/item/one']=array (
	  'class_name' => 'Item',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/item/one/:id

$o['GET']['api/v1/item/one/:id']=array (
	  'class_name' => 'Item',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/item/one/:id/:column

$o['GET']['api/v1/item/one/:id/:column']=array (
	  'class_name' => 'Item',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/item/find

$o['GET']['api/v1/item/find']=array (
	  'class_name' => 'Item',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/item/find/:id

$o['GET']['api/v1/item/find/:id']=array (
	  'class_name' => 'Item',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/item/find/:id/:columns

$o['GET']['api/v1/item/find/:id/:columns']=array (
	  'class_name' => 'Item',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/goods/one

$o['GET']['api/v1/goods/one']=array (
	  'class_name' => 'Goods',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/goods/one/:id

$o['GET']['api/v1/goods/one/:id']=array (
	  'class_name' => 'Goods',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/goods/one/:id/:column

$o['GET']['api/v1/goods/one/:id/:column']=array (
	  'class_name' => 'Goods',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/goods/find

$o['GET']['api/v1/goods/find']=array (
	  'class_name' => 'Goods',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/goods/find/:id

$o['GET']['api/v1/goods/find/:id']=array (
	  'class_name' => 'Goods',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/goods/find/:id/:columns

$o['GET']['api/v1/goods/find/:id/:columns']=array (
	  'class_name' => 'Goods',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/goodsspec/one

$o['GET']['api/v1/goodsspec/one']=array (
	  'class_name' => 'GoodsSpec',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/goodsspec/one/:id

$o['GET']['api/v1/goodsspec/one/:id']=array (
	  'class_name' => 'GoodsSpec',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/goodsspec/one/:id/:column

$o['GET']['api/v1/goodsspec/one/:id/:column']=array (
	  'class_name' => 'GoodsSpec',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/goodsspec/find

$o['GET']['api/v1/goodsspec/find']=array (
	  'class_name' => 'GoodsSpec',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/goodsspec/find/:id

$o['GET']['api/v1/goodsspec/find/:id']=array (
	  'class_name' => 'GoodsSpec',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/goodsspec/find/:id/:columns

$o['GET']['api/v1/goodsspec/find/:id/:columns']=array (
	  'class_name' => 'GoodsSpec',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/page/one

$o['GET']['api/v1/page/one']=array (
	  'class_name' => 'Page',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/page/one/:id

$o['GET']['api/v1/page/one/:id']=array (
	  'class_name' => 'Page',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/page/one/:id/:column

$o['GET']['api/v1/page/one/:id/:column']=array (
	  'class_name' => 'Page',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/page/find

$o['GET']['api/v1/page/find']=array (
	  'class_name' => 'Page',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/page/find/:id

$o['GET']['api/v1/page/find/:id']=array (
	  'class_name' => 'Page',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/page/find/:id/:columns

$o['GET']['api/v1/page/find/:id/:columns']=array (
	  'class_name' => 'Page',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/trash/one

$o['GET']['api/v1/trash/one']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/trash/one/:id

$o['GET']['api/v1/trash/one/:id']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/trash/one/:id/:column

$o['GET']['api/v1/trash/one/:id/:column']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/trash/find

$o['GET']['api/v1/trash/find']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/trash/find/:id

$o['GET']['api/v1/trash/find/:id']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/trash/find/:id/:columns

$o['GET']['api/v1/trash/find/:id/:columns']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/message/one

$o['GET']['api/v1/message/one']=array (
	  'class_name' => 'Message',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/message/one/:id

$o['GET']['api/v1/message/one/:id']=array (
	  'class_name' => 'Message',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/message/one/:id/:column

$o['GET']['api/v1/message/one/:id/:column']=array (
	  'class_name' => 'Message',
	  'method_name' => 'getOne',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'column' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '获取单条数据',
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/message/find

$o['GET']['api/v1/message/find']=array (
	  'class_name' => 'Message',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/message/find/:id

$o['GET']['api/v1/message/find/:id']=array (
	  'class_name' => 'Message',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/message/find/:id/:columns

$o['GET']['api/v1/message/find/:id/:columns']=array (
	  'class_name' => 'Message',
	  'method_name' => 'getFind',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'columns' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/uploader/file

$o['GET']['api/v1/uploader/file']=array (
	  'class_name' => 'Uploader',
	  'method_name' => 'getFile',
	  'arguments' => 
	  array (
	  ),
	  'defaults' => 
	  array (
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/fonts/remove

$o['GET']['api/v1/fonts/remove']=array (
	  'class_name' => 'Fonts',
	  'method_name' => 'getRemove',
	  'arguments' => 
	  array (
	    'fontid' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/fonts/remove/:fontid

$o['GET']['api/v1/fonts/remove/:fontid']=array (
	  'class_name' => 'Fonts',
	  'method_name' => 'getRemove',
	  'arguments' => 
	  array (
	    'fontid' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/fonts/content

$o['GET']['api/v1/fonts/content']=array (
	  'class_name' => 'Fonts',
	  'method_name' => 'getContent',
	  'arguments' => 
	  array (
	    'fontid' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/fonts/content/:fontid

$o['GET']['api/v1/fonts/content/:fontid']=array (
	  'class_name' => 'Fonts',
	  'method_name' => 'getContent',
	  'arguments' => 
	  array (
	    'fontid' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/site/js/source

$o['GET']['api/v1/site/js/source']=array (
	  'class_name' => 'site\\Js',
	  'method_name' => 'getSource',
	  'arguments' => 
	  array (
	    'name' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/site/js/source/:name

$o['GET']['api/v1/site/js/source/:name']=array (
	  'class_name' => 'site\\Js',
	  'method_name' => 'getSource',
	  'arguments' => 
	  array (
	    'name' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/site/css/source

$o['GET']['api/v1/site/css/source']=array (
	  'class_name' => 'site\\Css',
	  'method_name' => 'getSource',
	  'arguments' => 
	  array (
	    'name' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/site/css/source/:name

$o['GET']['api/v1/site/css/source/:name']=array (
	  'class_name' => 'site\\Css',
	  'method_name' => 'getSource',
	  'arguments' => 
	  array (
	    'name' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/site/php/source

$o['GET']['api/v1/site/php/source']=array (
	  'class_name' => 'site\\Php',
	  'method_name' => 'getSource',
	  'arguments' => 
	  array (
	    'name' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/site/php/source/:name

$o['GET']['api/v1/site/php/source/:name']=array (
	  'class_name' => 'site\\Php',
	  'method_name' => 'getSource',
	  'arguments' => 
	  array (
	    'name' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== GET api/v1/site/i18n/json

$o['GET']['api/v1/site/i18n/json']=array (
	  'class_name' => 'site\\I18n',
	  'method_name' => 'getJson',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);


############### POST ###############

$o['POST']=array();

#==== POST api/v1/admin/login

$o['POST']['api/v1/admin/login']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'postLogin',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 0,
	);

#==== POST api/v1/admin/password

$o['POST']['api/v1/admin/password']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'postPassword',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'request_data' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/admin/password/:id

$o['POST']['api/v1/admin/password/:id']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'postPassword',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'request_data' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/admin/password2

$o['POST']['api/v1/admin/password2']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'postPassword2',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/admin/add

$o['POST']['api/v1/admin/add']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'postAdd',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/admin/update

$o['POST']['api/v1/admin/update']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'postUpdate',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'request_data' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/admin/update/:id

$o['POST']['api/v1/admin/update/:id']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'postUpdate',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'request_data' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/admin/delete

$o['POST']['api/v1/admin/delete']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'postDelete',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/admin/upgrade

$o['POST']['api/v1/admin/upgrade']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'postUpgrade',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/admin/cache

$o['POST']['api/v1/admin/cache']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'postCache',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新缓存',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/admin/page

$o['POST']['api/v1/admin/page']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'postPage',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/admin/select

$o['POST']['api/v1/admin/select']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'postSelect',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '查询/分页',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/admin/query

$o['POST']['api/v1/admin/query']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'postQuery',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '预处理查询',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/admin/copy

$o['POST']['api/v1/admin/copy']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'postCopy',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '复制数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/admin/field

$o['POST']['api/v1/admin/field']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'postField',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新字段',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/admin/count

$o['POST']['api/v1/admin/count']=array (
	  'class_name' => 'Admin',
	  'method_name' => 'postCount',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '统计数量',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/save

$o['POST']['api/v1/site/save']=array (
	  'class_name' => 'Site',
	  'method_name' => 'postSave',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/save2

$o['POST']['api/v1/site/save2']=array (
	  'class_name' => 'Site',
	  'method_name' => 'postSave2',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/menu

$o['POST']['api/v1/site/menu']=array (
	  'class_name' => 'Site',
	  'method_name' => 'postMenu',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/theme

$o['POST']['api/v1/site/theme']=array (
	  'class_name' => 'Site',
	  'method_name' => 'postTheme',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/item/page

$o['POST']['api/v1/item/page']=array (
	  'class_name' => 'Item',
	  'method_name' => 'postPage',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/item/select

$o['POST']['api/v1/item/select']=array (
	  'class_name' => 'Item',
	  'method_name' => 'postSelect',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '查询/分页',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/item/query

$o['POST']['api/v1/item/query']=array (
	  'class_name' => 'Item',
	  'method_name' => 'postQuery',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '预处理查询',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/item/add

$o['POST']['api/v1/item/add']=array (
	  'class_name' => 'Item',
	  'method_name' => 'postAdd',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '添加数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/item/update

$o['POST']['api/v1/item/update']=array (
	  'class_name' => 'Item',
	  'method_name' => 'postUpdate',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'request_data' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/item/update/:id

$o['POST']['api/v1/item/update/:id']=array (
	  'class_name' => 'Item',
	  'method_name' => 'postUpdate',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'request_data' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/item/copy

$o['POST']['api/v1/item/copy']=array (
	  'class_name' => 'Item',
	  'method_name' => 'postCopy',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '复制数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/item/field

$o['POST']['api/v1/item/field']=array (
	  'class_name' => 'Item',
	  'method_name' => 'postField',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新字段',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/item/count

$o['POST']['api/v1/item/count']=array (
	  'class_name' => 'Item',
	  'method_name' => 'postCount',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '统计数量',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/item/delete

$o['POST']['api/v1/item/delete']=array (
	  'class_name' => 'Item',
	  'method_name' => 'postDelete',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '删除数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goods/page

$o['POST']['api/v1/goods/page']=array (
	  'class_name' => 'Goods',
	  'method_name' => 'postPage',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goods/select

$o['POST']['api/v1/goods/select']=array (
	  'class_name' => 'Goods',
	  'method_name' => 'postSelect',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '查询/分页',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goods/query

$o['POST']['api/v1/goods/query']=array (
	  'class_name' => 'Goods',
	  'method_name' => 'postQuery',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '预处理查询',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goods/add

$o['POST']['api/v1/goods/add']=array (
	  'class_name' => 'Goods',
	  'method_name' => 'postAdd',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '添加数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goods/update

$o['POST']['api/v1/goods/update']=array (
	  'class_name' => 'Goods',
	  'method_name' => 'postUpdate',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'request_data' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goods/update/:id

$o['POST']['api/v1/goods/update/:id']=array (
	  'class_name' => 'Goods',
	  'method_name' => 'postUpdate',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'request_data' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goods/copy

$o['POST']['api/v1/goods/copy']=array (
	  'class_name' => 'Goods',
	  'method_name' => 'postCopy',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '复制数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goods/field

$o['POST']['api/v1/goods/field']=array (
	  'class_name' => 'Goods',
	  'method_name' => 'postField',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新字段',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goods/count

$o['POST']['api/v1/goods/count']=array (
	  'class_name' => 'Goods',
	  'method_name' => 'postCount',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '统计数量',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goods/delete

$o['POST']['api/v1/goods/delete']=array (
	  'class_name' => 'Goods',
	  'method_name' => 'postDelete',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '删除数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goodsspec/page

$o['POST']['api/v1/goodsspec/page']=array (
	  'class_name' => 'GoodsSpec',
	  'method_name' => 'postPage',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goodsspec/select

$o['POST']['api/v1/goodsspec/select']=array (
	  'class_name' => 'GoodsSpec',
	  'method_name' => 'postSelect',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '查询/分页',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goodsspec/query

$o['POST']['api/v1/goodsspec/query']=array (
	  'class_name' => 'GoodsSpec',
	  'method_name' => 'postQuery',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '预处理查询',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goodsspec/add

$o['POST']['api/v1/goodsspec/add']=array (
	  'class_name' => 'GoodsSpec',
	  'method_name' => 'postAdd',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '添加数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goodsspec/update

$o['POST']['api/v1/goodsspec/update']=array (
	  'class_name' => 'GoodsSpec',
	  'method_name' => 'postUpdate',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'request_data' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goodsspec/update/:id

$o['POST']['api/v1/goodsspec/update/:id']=array (
	  'class_name' => 'GoodsSpec',
	  'method_name' => 'postUpdate',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'request_data' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goodsspec/copy

$o['POST']['api/v1/goodsspec/copy']=array (
	  'class_name' => 'GoodsSpec',
	  'method_name' => 'postCopy',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '复制数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goodsspec/field

$o['POST']['api/v1/goodsspec/field']=array (
	  'class_name' => 'GoodsSpec',
	  'method_name' => 'postField',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新字段',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goodsspec/count

$o['POST']['api/v1/goodsspec/count']=array (
	  'class_name' => 'GoodsSpec',
	  'method_name' => 'postCount',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '统计数量',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/goodsspec/delete

$o['POST']['api/v1/goodsspec/delete']=array (
	  'class_name' => 'GoodsSpec',
	  'method_name' => 'postDelete',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '删除数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/page/page

$o['POST']['api/v1/page/page']=array (
	  'class_name' => 'Page',
	  'method_name' => 'postPage',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/page/select

$o['POST']['api/v1/page/select']=array (
	  'class_name' => 'Page',
	  'method_name' => 'postSelect',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '查询/分页',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/page/query

$o['POST']['api/v1/page/query']=array (
	  'class_name' => 'Page',
	  'method_name' => 'postQuery',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '预处理查询',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/page/add

$o['POST']['api/v1/page/add']=array (
	  'class_name' => 'Page',
	  'method_name' => 'postAdd',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '添加数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/page/update

$o['POST']['api/v1/page/update']=array (
	  'class_name' => 'Page',
	  'method_name' => 'postUpdate',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'request_data' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/page/update/:id

$o['POST']['api/v1/page/update/:id']=array (
	  'class_name' => 'Page',
	  'method_name' => 'postUpdate',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'request_data' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/page/copy

$o['POST']['api/v1/page/copy']=array (
	  'class_name' => 'Page',
	  'method_name' => 'postCopy',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '复制数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/page/field

$o['POST']['api/v1/page/field']=array (
	  'class_name' => 'Page',
	  'method_name' => 'postField',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新字段',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/page/count

$o['POST']['api/v1/page/count']=array (
	  'class_name' => 'Page',
	  'method_name' => 'postCount',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '统计数量',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/page/delete

$o['POST']['api/v1/page/delete']=array (
	  'class_name' => 'Page',
	  'method_name' => 'postDelete',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '删除数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/trash/delete

$o['POST']['api/v1/trash/delete']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'postDelete',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/trash/replay

$o['POST']['api/v1/trash/replay']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'postReplay',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/trash/page

$o['POST']['api/v1/trash/page']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'postPage',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/trash/select

$o['POST']['api/v1/trash/select']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'postSelect',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '查询/分页',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/trash/query

$o['POST']['api/v1/trash/query']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'postQuery',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '预处理查询',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/trash/add

$o['POST']['api/v1/trash/add']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'postAdd',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '添加数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/trash/update

$o['POST']['api/v1/trash/update']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'postUpdate',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'request_data' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/trash/update/:id

$o['POST']['api/v1/trash/update/:id']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'postUpdate',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'request_data' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/trash/copy

$o['POST']['api/v1/trash/copy']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'postCopy',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '复制数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/trash/field

$o['POST']['api/v1/trash/field']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'postField',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新字段',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/trash/count

$o['POST']['api/v1/trash/count']=array (
	  'class_name' => 'Trash',
	  'method_name' => 'postCount',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '统计数量',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/finder/list

$o['POST']['api/v1/finder/list']=array (
	  'class_name' => 'Finder',
	  'method_name' => 'postList',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/finder/mkdir

$o['POST']['api/v1/finder/mkdir']=array (
	  'class_name' => 'Finder',
	  'method_name' => 'postMkdir',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/finder/rename

$o['POST']['api/v1/finder/rename']=array (
	  'class_name' => 'Finder',
	  'method_name' => 'postRename',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/finder/checkfile

$o['POST']['api/v1/finder/checkfile']=array (
	  'class_name' => 'Finder',
	  'method_name' => 'postCheckfile',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/finder/delete

$o['POST']['api/v1/finder/delete']=array (
	  'class_name' => 'Finder',
	  'method_name' => 'postDelete',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/message/page

$o['POST']['api/v1/message/page']=array (
	  'class_name' => 'Message',
	  'method_name' => 'postPage',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/message/select

$o['POST']['api/v1/message/select']=array (
	  'class_name' => 'Message',
	  'method_name' => 'postSelect',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '查询/分页',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/message/query

$o['POST']['api/v1/message/query']=array (
	  'class_name' => 'Message',
	  'method_name' => 'postQuery',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '预处理查询',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/message/add

$o['POST']['api/v1/message/add']=array (
	  'class_name' => 'Message',
	  'method_name' => 'postAdd',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '添加数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/message/update

$o['POST']['api/v1/message/update']=array (
	  'class_name' => 'Message',
	  'method_name' => 'postUpdate',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'request_data' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/message/update/:id

$o['POST']['api/v1/message/update/:id']=array (
	  'class_name' => 'Message',
	  'method_name' => 'postUpdate',
	  'arguments' => 
	  array (
	    'id' => 0,
	    'request_data' => 1,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	    1 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/message/copy

$o['POST']['api/v1/message/copy']=array (
	  'class_name' => 'Message',
	  'method_name' => 'postCopy',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '复制数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/message/field

$o['POST']['api/v1/message/field']=array (
	  'class_name' => 'Message',
	  'method_name' => 'postField',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '更新字段',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/message/count

$o['POST']['api/v1/message/count']=array (
	  'class_name' => 'Message',
	  'method_name' => 'postCount',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '统计数量',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/message/delete

$o['POST']['api/v1/message/delete']=array (
	  'class_name' => 'Message',
	  'method_name' => 'postDelete',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	    'long_description' => '删除数据',
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/uploader/image

$o['POST']['api/v1/uploader/image']=array (
	  'class_name' => 'Uploader',
	  'method_name' => 'postImage',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/uploader/file

$o['POST']['api/v1/uploader/file']=array (
	  'class_name' => 'Uploader',
	  'method_name' => 'postFile',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/backup/site

$o['POST']['api/v1/backup/site']=array (
	  'class_name' => 'Backup',
	  'method_name' => 'postSite',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/backup/database

$o['POST']['api/v1/backup/database']=array (
	  'class_name' => 'Backup',
	  'method_name' => 'postDatabase',
	  'arguments' => 
	  array (
	  ),
	  'defaults' => 
	  array (
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/backup/delete

$o['POST']['api/v1/backup/delete']=array (
	  'class_name' => 'Backup',
	  'method_name' => 'postDelete',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/fonts/build

$o['POST']['api/v1/fonts/build']=array (
	  'class_name' => 'Fonts',
	  'method_name' => 'postBuild',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/fonts/download

$o['POST']['api/v1/fonts/download']=array (
	  'class_name' => 'Fonts',
	  'method_name' => 'postDownload',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/js/save

$o['POST']['api/v1/site/js/save']=array (
	  'class_name' => 'site\\Js',
	  'method_name' => 'postSave',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/css/save

$o['POST']['api/v1/site/css/save']=array (
	  'class_name' => 'site\\Css',
	  'method_name' => 'postSave',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/php/save

$o['POST']['api/v1/site/php/save']=array (
	  'class_name' => 'site\\Php',
	  'method_name' => 'postSave',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/i18n/texts

$o['POST']['api/v1/site/i18n/texts']=array (
	  'class_name' => 'site\\I18n',
	  'method_name' => 'postTexts',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/i18n/savekv

$o['POST']['api/v1/site/i18n/savekv']=array (
	  'class_name' => 'site\\I18n',
	  'method_name' => 'postSaveKV',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/i18n/removekey

$o['POST']['api/v1/site/i18n/removekey']=array (
	  'class_name' => 'site\\I18n',
	  'method_name' => 'postRemoveKey',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/i18n/save

$o['POST']['api/v1/site/i18n/save']=array (
	  'class_name' => 'site\\I18n',
	  'method_name' => 'postSave',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/cossync/copy

$o['POST']['api/v1/site/cossync/copy']=array (
	  'class_name' => 'site\\CosSync',
	  'method_name' => 'postCopy',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/cossync/rename

$o['POST']['api/v1/site/cossync/rename']=array (
	  'class_name' => 'site\\CosSync',
	  'method_name' => 'postRename',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/cossync/upload

$o['POST']['api/v1/site/cossync/upload']=array (
	  'class_name' => 'site\\CosSync',
	  'method_name' => 'postUpload',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/cossync/uploads

$o['POST']['api/v1/site/cossync/uploads']=array (
	  'class_name' => 'site\\CosSync',
	  'method_name' => 'postUploads',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/cossync/files

$o['POST']['api/v1/site/cossync/files']=array (
	  'class_name' => 'site\\CosSync',
	  'method_name' => 'postFiles',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/cossync/resetsyncfiles

$o['POST']['api/v1/site/cossync/resetsyncfiles']=array (
	  'class_name' => 'site\\CosSync',
	  'method_name' => 'postResetSyncFiles',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/cossync/pathacl

$o['POST']['api/v1/site/cossync/pathacl']=array (
	  'class_name' => 'site\\CosSync',
	  'method_name' => 'postPathAcl',
	  'arguments' => 
	  array (
	  ),
	  'defaults' => 
	  array (
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/cossync/test

$o['POST']['api/v1/site/cossync/test']=array (
	  'class_name' => 'site\\CosSync',
	  'method_name' => 'postTest',
	  'arguments' => 
	  array (
	  ),
	  'defaults' => 
	  array (
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/sitemap/crawlurls

$o['POST']['api/v1/site/sitemap/crawlurls']=array (
	  'class_name' => 'site\\Sitemap',
	  'method_name' => 'postCrawlUrls',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);

#==== POST api/v1/site/sitemap/write

$o['POST']['api/v1/site/sitemap/write']=array (
	  'class_name' => 'site\\Sitemap',
	  'method_name' => 'postWrite',
	  'arguments' => 
	  array (
	    'request_data' => 0,
	  ),
	  'defaults' => 
	  array (
	    0 => NULL,
	  ),
	  'metadata' => 
	  array (
	  ),
	  'method_flag' => 3,
	);
return $o;