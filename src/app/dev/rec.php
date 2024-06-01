<?php
return function ($module, $action) {

    view()->display("$module/$action");
};