<?php
return function ($delivery = null) {
    return [1 => '送货上门', 2 => '仅限自提', 3 => '双方商量'][$delivery];
};