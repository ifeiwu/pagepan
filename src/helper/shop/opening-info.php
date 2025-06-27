<?php
// 返回营业时间信息
return function () {
    $hour = '';
    $week = '';
    $status = false;
    $opening = SITE['shop_opening'];
    if ($opening == 1) {
        $hour = '全天';
        $status = true;
    } elseif ($opening == 2) {
        $hour = '休息中';
    } else {
        $weeks = json_decode2(SITE['shop_opening_weeks']) ?? [];
        $hour = SITE['shop_opening_start'] . '-' . SITE['shop_opening_end'];
        if (count($weeks) < 7) {
            if ([1, 2, 3, 4, 5, 6] == $weeks) {
                $week = '一至六';
            } elseif ([1, 2, 3, 4, 5] == $weeks) {
                $week = '一至五';
            } elseif ([1, 2, 3, 4] == $weeks) {
                $week = '一至四';
            } else {
                $mapping = ['1' => '一', '2' => '二', '3' => '三', '4' => '四', '5' => '五', '6' => '六', '7' => '日'];
                foreach ($weeks as $w) {
                    $week .= $mapping[$w];
                }
            }
        }
        // 计算当前时间状态
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
                $status = true;
            }
        }
    }

    return ['status' => $status, 'hour' => $hour, 'week' => $week];
};