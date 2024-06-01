<?php
return function ($alias) {

    Pager::new()->display(['alias' => $alias]);
};