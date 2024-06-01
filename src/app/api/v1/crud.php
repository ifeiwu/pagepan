<?php
use utils\FS;
use utils\Log;

// 通用的数据库增删改查
class CRUD extends Base {

    public function __construct()
    {
        parent::__construct();
    }

    // 数据分页
    protected function postPage($request_data)
    {
        $this->_callback('callbackPageBefore', [&$request_data]);

        $column = $request_data['column'] ?: '*';
        $where = $request_data['where'] ?: '1 = 1';
        $order = $request_data['order'] ?: $this->order;
        $perpage = $request_data['perpage'] ?: 0;

        if ( $perpage > 0 )
        {
            $pagenum = $request_data['pagenum'] ?: 1;
            $pagenum = $pagenum ? $pagenum - 1 : 0;

            $total = db_count($this->table, $where);
            $list = db_all($this->table, $column, $where, $order, [$pagenum * $perpage, $perpage]);

            foreach ($list as $i => $item)
            {
                $pid = $item['pid'];

                if ( $pid > 0 )
                {
                    $_category = db_get($this->table, ['id', 'title', 'alias'], array(array('id', '=', $pid)));

                    $list[$i]['_category'] = json_encode($_category);
                }
            }

            $data = array('list' => $list, 'total' => $total, 'perpage' => $perpage, 'pagenum' => $pagenum);
        }
        else
        {
            if ( $limit = $request_data['limit'] )
            {
                $data = db_all($this->table, $column, $where, $order, $limit);
            }
            else
            {
                $data = db_all($this->table, $column, $where, $order);
            }
        }

        $this->_callback('callbackPageAfter', array(&$data));

        return $this->_success($data);
    }


    /**
     * 查询/分页
     */
    protected function postSelect($request_data)
    {
        return $this->postPage($request_data);
    }


    /**
     * 预处理查询
     */
    protected function postQuery($request_data)
    {
        // 预处理语句，例如：SELECT * FROM $table where name = ?
        $sql = $request_data['sql'];

        if ( stripos($sql, '$table') !== false )
        {
            $sql = str_replace('$table', '{prefix}' . $this->table, $sql);
        }

        $data = db_query_all($sql, $request_data['values']);

        return $this->_success($data);
    }


    /**
     * 获取单条数据
     */
    protected function getOne($id, $column = null)
    {
        $column = $column ?: '*';

        $data = db_get($this->table, $column, array('id', '=', $id));

        return $this->_success($data);
    }

    protected function getFind($id, $columns = null)
    {
        return $this->getOne($id, $columns);
    }


    /**
     * 添加数据
     */
    protected function postAdd($request_data)
    {
        $this->_callback('callbackAddBefore', array(&$request_data));

        // 删除文件
        $remove_files = $this->_removeFiles2($request_data['_removefiles']);

        $data = $this->_bulidData($request_data);

        $data['ctime'] = time();

        $id = db_insert($this->table, $data, 'id');

        if ( ! $id )
        {
            return $this->_error('添加失败');
        }

        $udata = array('id' => $id);

        // 关联层次
        $pid = $data['pid'];

        if ( in_array('level', $this->fields) )
        {
            $udata['level'] = $this->_getLevel($pid, $id);
        }

        // 上传路径
        $upload_name = $request_data['$upload_name'];
        $upload_path = $request_data['$upload_path'];

        if ( in_array($upload_name, $this->fields) && $upload_path )
        {
            $data['id'] = $id;
            $upload_path = $this->_bulidUploadPath($upload_path, $data);

            $udata[$upload_name] = $upload_path;

            $this->_add_sync_files($remove_files);
        }

        // 更新数据
		if ( db_update($this->table, $udata, array('id', '=', $id)) )
        {
            $this->_callback('callbackAddAfter', array($id, &$request_data));

            utils\Webhook::dataSource($this->table . '.create', $id);

            // 日志记录
            $this->_log('add', array('title' => $data['title'], 'table_id' => $id));

            return $this->_success('添加成功', ['id' => $id]);
        }
        else
        {
            return $this->_error('添加失败', ['id' => $id]);
        }
    }


    /**
     * 更新数据
     */
    protected function postUpdate($id, $request_data)
    {
        $this->_callback('callbackUpdateBefore', array(&$request_data));

        if ( ! db_has($this->table, array('id', '=', $id)) )
        {
            return $this->_error('ID【' . $id . '】没有找到');
        }

        // 删除文件
        $remove_files = $this->_removeFiles2($request_data['_removefiles']);

        $data = $this->_bulidData($request_data);

        $data['utime'] = time();

        // 关联层次
        $pid = $data['pid'];

        if ( in_array('level', $this->fields) )
        {
            $data['level'] = $this->_getLevel($pid, $id);
        }

        // 上传路径
        $upload_name = $request_data['$upload_name'];
        $upload_path = $request_data['$upload_path'];

        if ( $upload_name && $upload_path )
        {
            $upload_path = $this->_bulidUploadPath($upload_path, $data);

            if ( in_array($upload_name, $this->fields) )
            {
                $data[$upload_name] = $upload_path;
            }

            $this->_add_sync_files($remove_files);
        }

        // 更新数据
		if ( db_update($this->table, $data, array('id', '=', $id)) )
        {
            $this->_callback('callbackUpdateAfter', array($id, &$request_data));

            utils\Webhook::dataSource($this->table . '.update', $id);

            $this->_log('update', array('title' => $data['title']));

            return $this->_success('更新成功', ['id' => $id]);
        }
        else
        {
            return $this->_error('更新失败', ['id' => $id]);
        }
    }


    /**
     * 复制数据
     */
    protected function postCopy($request_data)
    {
        $failed_ids = $succeed_ids = [];

        $ids = $request_data['ids'] ?: $request_data['id'];
        $ids = is_array($ids) ? $ids : [$ids];

        foreach ($ids as $id)
        {
            $item = db_get($this->table, '*', array('id', '=', $id));
            
            $item['title'] = $item['title'] . ' - 复制';
            
            unset($item['id']);

            if ( $insert_id = db_insert($this->table, $item) )
            {
                $succeed_ids[] = $insert_id;

                utils\Webhook::dataSource($this->table . '.create', null, $item);
            }
            else
            {
                $failed_ids[] = $id;
            }
        }

        if ( count($failed_ids) == 0 )
        {
            return $this->_success('复制成功', ['succeed_ids' => $succeed_ids]);
        }
        else
        {
            return $this->_error('复制失败', ['failed_ids' => $failed_ids, 'succeed_ids' => $succeed_ids]);
        }
    }


    /**
     * 更新字段
     */
    protected function postField($request_data)
    {
        $name = $request_data['name'];
        $value = $request_data['value'];

        $failed_ids = $succeed_ids = [];

        $ids = $request_data['ids'] ?: $request_data['id'];
        $ids = is_array($ids) ? $ids : [$ids];

        foreach ($ids as $id)
        {
            if ( db_update($this->table, array($name => $value), array('id', '=', $id)) )
            {
                $succeed_ids[] = $id;

                utils\Webhook::dataSource($this->table . '.update', $id);
            }
            else
            {
                $failed_ids[] = $id;
            }
        }

        if ( count($failed_ids) == 0 )
        {
            return $this->_success('更新成功', ['succeed_ids' => $succeed_ids]);
        }
        else
        {
            return $this->_error('更新失败', ['failed_ids' => $failed_ids, 'succeed_ids' => $succeed_ids]);
        }
    }


    /**
     * 统计数量
     */
    protected function postCount($request_data)
    {
        $table = $request_data['table'] ?: $this->table;
        $where = $request_data['where'] ?: '1 = 1';

        return db_count($table, $where);
    }


    /**
     * 删除数据
     */
    protected function postDelete($request_data)
    {
        $this->_callback('callbackDeleteBefore', array(&$request_data));

        $failed_ids = $succeed_ids = [];

        $ids = $request_data['ids'] ?: $request_data['id'];
        $ids = is_array($ids) ? $ids : [$ids];

        foreach ($ids as $id)
        {
            $item = db_get($this->table, '*', array('id', '=', $id));

            if ( $item && db_delete($this->table, array('id', '=', $id)) )
            {
                $succeed_ids[] = $id;

                utils\Webhook::dataSource($this->table . '.delete', null, $item);

                $this->_trash($item, $request_data); // 回收站
            }
            else
            {
                $failed_ids[] = $id;
            }
        }

        if ( count($failed_ids) == 0 )
        {
            $this->_callback('callbackDeleteAfter', array(&$request_data));

            $this->_log('remove', array('title' => count($ids)));

            return $this->_success('删除成功', ['succeed_ids' => $succeed_ids]);
        }
        else
        {
            return $this->_error('删除失败', ['failed_ids' => $failed_ids, 'succeed_ids' => $succeed_ids]);
        }
    }
}
