<?php

class Stats extends CRUD {

    function __construct()
    {
        $this->table = 'stats';

        parent::__construct();
    }

    protected function getDays()
    {
        $data = array('years' => array(), 'months' => array(), 'days' => array());
        $table = '{prefix}' . $this->table;//$this->prefix . $this->table;
        /* $browsers = $this->db->query("SELECT browser_name,count(browser_name) FROM {$table} GROUP BY browser_name")->fetchAll(\PDO::FETCH_NUM);

          foreach ($browsers as $value) {
          $key = $value[0]?: '其它';
          $data['browser'][$key] = $value[1];
          } */

        //每天
        $days = date('j');
		
        for ($i = 1; $i <= $days; $i++)
        {
            $day = $days - $i;
            $data['days'][$i . '日'] = array(
                'uv' => $this->_getDaysCount($table, $day, 'cookie'),
                'pv' => $this->_getDaysCount($table, $day, 'id'),
                'ip' => $this->_getDaysCount($table, $day, 'ip')
            );
        }

        $month = date('m');
		
        for ($i = 0; $i <= 1; $i++)
        {
            $month = $month - $i;
            $data['months'][] = array(
                'month' => $month,
                'uv' => $this->_getMonthsCount($table, $i, 'cookie'),
                'pv' => $this->_getMonthsCount($table, $i, 'id'),
                'ip' => $this->_getMonthsCount($table, $i, 'ip')
            );
        }

        $data['years'][] = array(
            'year' => date('Y'),
            'uv' => $this->_getYearsCount($table, 0, 'cookie'),
            'pv' => $this->_getYearsCount($table, 0, 'id'),
            'ip' => $this->_getYearsCount($table, 0, 'ip')
        );

        return $this->_success($data);
    }

    private function _getDaysCount($table, $day, $group)
    {
        if ($group != 'id')
        {
            return db_query_get("SELECT COUNT(t.num) FROM (SELECT COUNT(*) num FROM {$table} WHERE date_format(date,'%Y-%m-%d') = date_format(SUBDATE(now(),interval {$day} day),'%Y-%m-%d') GROUP BY `{$group}`) t", null, 0);
			//$this->db->query("SELECT COUNT(t.num) FROM (SELECT COUNT(*) num FROM {$table} WHERE date_format(date,'%Y-%m-%d') = date_format(SUBDATE(now(),interval {$day} day),'%Y-%m-%d') GROUP BY `{$group}`) t")->get(0);
        }
        else
        {
            return db_query_get("SELECT COUNT(*) num FROM {$table} WHERE date_format(date,'%Y-%m-%d') = date_format(SUBDATE(now(),interval {$day} day),'%Y-%m-%d')", null, 0);
			//$this->db->query("SELECT COUNT(*) num FROM {$table} WHERE date_format(date,'%Y-%m-%d') = date_format(SUBDATE(now(),interval {$day} day),'%Y-%m-%d')")->get(0);
        }
    }

    private function _getMonthsCount($table, $month, $group)
    {
        if ($group != 'id')
        {
            return db_query_get("SELECT COUNT(t.num) FROM (SELECT COUNT(*) num FROM {$table} WHERE date_format(date,'%Y-%m') = date_format(SUBDATE(now(),interval {$month} month),'%Y-%m') GROUP BY `{$group}`) t", null, 0);
			//$this->db->query("SELECT COUNT(t.num) FROM (SELECT COUNT(*) num FROM {$table} WHERE date_format(date,'%Y-%m') = date_format(SUBDATE(now(),interval {$month} month),'%Y-%m') GROUP BY `{$group}`) t")->get(0);
        }
        else
        {
            return db_query_get("SELECT COUNT(*) num FROM {$table} WHERE date_format(date,'%Y-%m') = date_format(SUBDATE(now(),interval {$month} month),'%Y-%m')", null, 0);
			//$this->db->query("SELECT COUNT(*) num FROM {$table} WHERE date_format(date,'%Y-%m') = date_format(SUBDATE(now(),interval {$month} month),'%Y-%m')")->get(0);
        }
    }

    private function _getYearsCount($table, $year, $group)
    {
        if ($group != 'id')
        {
            return db_query_get("SELECT COUNT(t.num) FROM (SELECT COUNT(*) num FROM {$table} WHERE date_format(date,'%Y') = date_format(SUBDATE(now(),interval {$year} year),'%Y') GROUP BY `{$group}`) t", null, 0);
			//$this->db->query("SELECT COUNT(t.num) FROM (SELECT COUNT(*) num FROM {$table} WHERE date_format(date,'%Y') = date_format(SUBDATE(now(),interval {$year} year),'%Y') GROUP BY `{$group}`) t")->get(0);
        }
        else
        {
            return db_query_get("SELECT COUNT(*) num FROM {$table} WHERE date_format(date,'%Y') = date_format(SUBDATE(now(),interval {$year} year),'%Y')", null, 0);
			//$this->db->query("SELECT COUNT(*) num FROM {$table} WHERE date_format(date,'%Y') = date_format(SUBDATE(now(),interval {$year} year),'%Y')")->get(0);
        }
    }

}
