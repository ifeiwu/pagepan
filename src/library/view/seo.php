<?php
/**
 * SEO 设置
 */
return function ($title = '', $subtitle = '', $keywords = '', $description = '', $divider = ' - ') {
    $seo = [];
    if ( $title ) {
        if ( $subtitle === '' ) {
            $subtitle = $divider . $this->site['name'];
        } elseif ( $subtitle !== false ) {
            $subtitle = $divider . $subtitle . $divider . $this->site['name'];
        }
        $seo['title'] = $title . $subtitle;
    }

    if ( $keywords ) {
        $seo['keywords'] = $keywords;
    }

    if ( $description ) {
        $seo['description'] = $description;
    }

    $this->assign('seo', $seo);
};