<?php

class Log extends CRUD {

    function __construct()
    {
        $this->table = 'log';

        parent::__construct();
    }

    protected function callbackPageAfter(&$data)
    {
        $data['list'] = $this->_getData($data['list']);
    }

    // 最近活动
    protected function getLately()
    {
        $list = db_all($this->table, '*', ['pid', '=', 0], ['ctime' => 'DESC'], [4]);

        return $this->_success($this->_getData($list));
    }

    protected function postDelete($request_data)
    {
        $error = array();
        $ids = $request_data['id'];

        foreach ($ids as $id)
        {
			if ( ! db_delete($this->table, array('id', '=', $id)) )
            {
                $error[] = $id;
            }
        }

        if (count($error) == 0)
        {
            return $this->_success();
        }
        else
        {
            return $this->_error('有' . count($error) . '条数据删除失败！');
        }
    }

    private function _getData($data)
    {
        foreach ($data as $key => $value)
        {
            $type = $value['type'];
            $title = $value['title'];
            $url = $value['url'];

            switch ($type)
            {
                case 'login':
                    $data[$key]['title'] = '登录';
                    break;

                case 'add':
                    $data[$key]['title'] = '添加:&nbsp;' . $title;
                    break;

                case 'update':
                    $data[$key]['title'] = '修改:&nbsp;' . $title;
                    break;

                case 'remove':
                    $data[$key]['title'] = '移除&nbsp;' . $title . '&nbsp;条数据';
                    break;

                case 'reply':
                    $data[$key]['title'] = '还原&nbsp;' . $title . '&nbsp;条数据';
                    break;

                case 'delete':
                    $data[$key]['title'] = '清理&nbsp;' . $title . '&nbsp;条数据';
            }
        }

        return $data;
    }

}
