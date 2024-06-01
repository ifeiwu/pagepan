<?php
/**
 * 返回数据表所有字段名称
 * @param string $table 数据表名称
 * @return array
 */
return function ($table)
{
    if ( $this->dbtype == 'mysql' ) {
        $sql = 'SHOW COLUMNS FROM ' . $this->getTableName($table, false);
        $column_name = 'Field';
    } elseif ( $this->dbtype == 'sqlite' ) {
        $sql = 'PRAGMA table_info(' . $this->getTableName($table, false) . ')';
        $column_name = 'name';
    }

    $fields = [];
    $columns = $this->queryAll($sql);

    foreach($columns as $column) {
        $fields[] = $column[$column_name];
    }

    return $fields;
};