<?php
return function () {
    $value = false;
    $text = '';
    $opening = SITE['shop_opening'];
    if ($opening == 1) {
        $text = '全天';
        $value = true;
    } elseif ($opening == 2) {
        $text = '休息中';
    } else {
        $date = new DateTime();
        $weekday = $date->format('N');
        $weeks = json_decode(SITE['shop_opening_week'], true) ?? [];
        if (in_array($weekday, $weeks)) {
            // 获取当前时间
            $current_time = new DateTime(); // 当前时间
            $current_time->setTimezone(new DateTimeZone('Asia/Shanghai')); // 设置时区
            // 指定的时间范围
            $start_time = new DateTime('today ' . SITE['shop_opening_start']); // 如：今天的 06:00
            $end_time = new DateTime('today ' . SITE['shop_opening_end']);   // 如：今天的 18:30
            // 比较当前时间是否在指定范围内
            if ($current_time >= $start_time && $current_time <= $end_time) {
                $text = SITE['shop_opening_start'] . '-' . SITE['shop_opening_end'];
                $value = true;
            } else {
                $text = '休息中';
            }
        } else {
            $text = '休息中';
        }
    }

    return $value;
};