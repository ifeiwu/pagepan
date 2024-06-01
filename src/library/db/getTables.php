<?php
/**
 * 返回所有数据表名称
 * @return array
 */
return function ()
{
    if ( $this->dbtype == 'mysql' ) {
        $sql = 'SHOW TABLES';
    } elseif ( $this->dbtype == 'sqlite' ) {
        $sql = '';
    }

    return $this->queryAll($sql, [], 0);
};