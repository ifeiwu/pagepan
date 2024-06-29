<?php
/**
 * 是否有指定的表名
 * @param $table
 * @return bool
 */
return function ($name)
{
    $isTable = false;

    if ( $this->dbtype == 'mysql' ) {
        $isTable = $this->query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='" . $this->dbname . "' AND TABLE_NAME ='" . $this->getTableName($name, false) . "'", [], 0);
    } elseif ( $this->dbtype == 'sqlite' ) {
        $isTable = $this->query("SELECT name FROM sqlite_master WHERE type='table' AND name = '" . $this->getTableName($name, false) . "'", [], 0);
    }

    return $isTable ? true : false;
};