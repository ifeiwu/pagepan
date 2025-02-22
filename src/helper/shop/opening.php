<?php
return function () {
    $bool = false;
    $text = '';
    if (SITE['shop_opening'] == 1) {
        $text = '全天';
        $bool = true;
    } elseif (SITE['shop_opening'] == 2) {
        $text = '休息中';
    } else {
        $weekday = date('D');
        $weeks = json_decode(SITE['shop_opening_week'], true) ?? [];
        if (in_array($weekday, $weeks)) {
            $text = SITE['shop_opening_start'] . '-' . SITE['shop_opening_end'];
            $bool = true;
        } else {
            $text = '休息中';
        }
    }

    return [$bool, $text];
};