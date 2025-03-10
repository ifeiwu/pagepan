<?php
// 营业时间：返回是否开店状
return function () {
    $value = false;
    $opening = SITE['shop_opening'];
    if ($opening == 1) {
        $value = true;
    } elseif ($opening == 2) {
        $value = false;
    } else {
        $date = new DateTime();
        $weekday = $date->format('N');
        $weeks = json_decode2(SITE['shop_opening_weeks']) ?? [];
        if (in_array($weekday, $weeks)) {
            // 获取当前时间
            $current_time = new DateTime(); // 当前时间
            $current_time->setTimezone(new DateTimeZone('Asia/Shanghai')); // 设置时区
            // 指定的时间范围
            $start_time = new DateTime('today ' . SITE['shop_opening_start']); // 如：今天的 06:00
            $end_time = new DateTime('today ' . SITE['shop_opening_end']);   // 如：今天的 18:30
            // 比较当前时间是否在指定范围内
            if ($current_time >= $start_time && $current_time <= $end_time) {
                $value = true;
            }
        }
    }

    return $value;
};