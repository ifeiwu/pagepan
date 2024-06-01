<?php
// 页面数据
class Page extends CRUD {

    function __construct()
    {
        $this->table = 'page';

        parent::__construct();
    }

    /*protected function getAll()
    {
        $table = $this->table;
        
        $columns = '`id`, `pid`, `cid`, `state`, `sortby`, `ctime`, `utime`, `type`, `title`, `alias`, `dataset`, `layout`, `seo`, `setting`, `body`';
        
        $wheres = "type IN ('guide', 'home', 'dataset', 'inside', 'graphic', 'pro', 'layout', '404')";
        
        $orders = "CASE type WHEN 'guide' THEN 1 WHEN 'home' THEN 2 WHEN 'dataset' THEN 3 WHEN 'inside' THEN 4 WHEN 'graphic' THEN 5 WHEN 'pro' THEN 6 WHEN 'layout' THEN 7 WHEN '404' THEN 8 END, ctime DESC";
        
        $items = db_query_all("SELECT $columns FROM {prefix}$table WHERE $wheres ORDER BY $orders");
    
        foreach ($items as $key => $item)
        {
            if ( $item['type'] == 'dataset' )
            {
                $table = $item['alias'] ? $item['alias'] : 'item';
                
                if ( db_is_table($table) )
                {
                    $items[$key]['item_count'] = db_count($table, array(array('page_id', '=', $item['id'])));
                }
            }
        }

        return $this->_success($items);
    }
	
	
	protected function postDelete($request_data)
	{
		$layouts = $datasets = [];
		
		$ids = $request_data['id'];
		
		foreach ($ids as $id)
		{
			$page = db_get($this->table, '*', array('id', '=', $id));
			
			$join_layout_count = 0;
			$join_dataset_count = 0;
			
			if ( $page['type'] == 'layout' )
			{
				if ( db_count($this->table, ['layout', '=', $page['alias']]) > 0 )
				{
					$layouts[] = $page['title'];
					
					break;
				}
			}
			else if ( $page['type'] == 'dataset' )
			{
				$page_alias = $page['alias'] ?: 'item';
				
				if ( db_count($page_alias, ['page_id', '=', $page['id']]) > 0 )
				{
					$datasets[] = $page['title'];
					
					break;
				}
			}
			
			if ( db_delete($this->table, array('id', '=', $id)) )
			{
			    // 回收站
			    $this->_trash($page, $request_data);
			}
		}
		
		if ( ! empty($layouts) )
		{
			return $this->_error('【' . implode(',', $layouts) . '】布局和其它页面有关联，请取消关联再删除！');
		}
		elseif ( ! empty($datasets) )
		{
			return $this->_error('【' . implode(',', $datasets) . '】数据源下还有其它项目，请清空再删除！');
		}
		else
		{
			return $this->_success();
		}
	}*/
}
