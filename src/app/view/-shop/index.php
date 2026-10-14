<?php
$setting = [
    'userdata.logo' => 'https://site.pagepan.test/shop-logo.png?1789955007',
    'userdata.welcome' => '欢迎光临',
    'userdata.name' => '美食达',
    'userdata.signature' => '订购新鲜食材，并将它们直接送到您家门口。'
];
?>
<section class="py-10">
    <div class="container container-sm">
        <div class="flex items-center gx-5 mb-8">
            <div>
                <img src="<?=$setting['userdata.logo'] ?: SITE['shop_logo']?>" style="--maxh:35px" alt="">
            </div>
            <div>
                <div class="f-3 mix-20"><?=$setting['userdata.welcome'] ?: '欢迎光临'?></div>
                <div class="f-7 bold"><?=$setting['userdata.name'] ?: SITE['shop_name']?></div>
            </div>
            <div class="ml-auto">
                <div class="flex flex-col right">
                    <div class="f-6 mb-1">营业时间</div>
                    <div class="self-end">
                        <div class="flex items-center gx-1 mix-15 f-5 lh-0">
                            <div>
                                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 12h-4V6"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2M18.848 4.17a11.19 11.19 0 0 1 .985.986M15 2c.482.143.955.326 1.413.547m5.024 5.008c.228.468.417.952.563 1.445"/></svg>
                            </div>
                            <div><?php
//                                $opening_info = helper('shop/opening-info');
//                                if ($opening_info['status'] == true) {
//                                    echo $opening_info['hour'];
//                                } else {
//                                    echo '休息中';
//                                }
                                ?></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="max-w-8">
            <h3 class="f-11 lh-3"><?=$setting['userdata.signature'] ?: SITE['shop_signature']?></h3>
        </div>
    </div>
</section>

