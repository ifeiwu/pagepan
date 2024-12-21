<?php
return function ($table, $pid, $id = 0) {
    $list = [];
    $_getLevel = function ($pid, $id = 0) use (&$_getLevel, &$list, &$table) {
        if ($pid === '') {
            $pid = db()->find($table, 'pid', ['id', '=', $id], null, 0);
        }

        if ($pid != 0) {
            $list[] = $pid;
            $_getLevel('', $pid);
        }

        if (count($list) == 0) {
            return ',' . $id . ',';
        } else {
            if ($id) {
                return ',' . implode(',', array_reverse($list)) . ',' . $id . ',';
            } else {
                return ',' . implode(',', array_reverse($list)) . ',';
            }
        }
    };

    return $_getLevel($pid, $id);
};