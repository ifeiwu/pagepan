<?php
// 是否手机或平板设备
return function ($detect = null) {
	$md = new MobileDetect();

	if ( $detect == 'phone' ) {
		return $md->isMobile() && ! $md->isTablet(); // 手机
	} elseif ( $detect == 'tablet' ) {
		return $md->isTablet(); // 平板
	} else {
		return $md->isMobile(); // 手机或平板
	}
};