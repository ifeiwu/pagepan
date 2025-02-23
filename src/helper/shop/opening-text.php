<?php
// 返回营业时间文本
return function () {
    $hour = '';
    $week = '';
    $opening = SITE['shop_opening'];
    if ($opening == 1) {
        $hour = '全天';
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
                $mapping = ['1' => '一', '2' => '二', '3' => '三', '4' => '四', '5' => '五', '6' => '六', '7' => '七'];
                foreach ($weeks as $w) {
                    $week .= $mapping[$w];
                }
            }
        }
    }
    return ['hour' => $hour, 'week' => $week];
};