<?php

namespace app\controller;

use support\Request;
use support\Response;

class Imgph
{
    /**
     * 生成图片占位符
     * <img src="/imgph/bg?w=500&h=500&fill=000&color=fff&size=20">
     */
    public function bg(Request $request): Response
    {
        $width = $request->get('w');
        $height = $request->get('h');
        $fill = $request->get('fill') ?: 'd6dff4';
        $color = $request->get('color') ?: '9aabd6';
        $size = $request->get('size');
        $text = $request->get('text');
        $text = $text ?? $width . ' x ' . $height;
        $textx = $request->get('x') ?: '50%';
        $texty = $request->get('y') ?: '50%';

        // 字体大小全等于0，不显示图片尺寸文字
        if (is_null($size)) {
            $size = $width / 20;
        } elseif ($size === 0) {
            $text = '';
        }

        $body = '<svg viewBox="0 0 ' . $width . ' ' . $height . '" width="' . $width . 'px" height="' . $height . 'px" xmlns="http://www.w3.org/2000/svg">
            <rect height="100%" width="100%" y="0" x="0" fill="#' . $fill . '"/>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#diagonalHatch)" opacity="0.8"/>
            <text fill="#' . $color . '" font-size="' . $size . '" x="' . $textx . '" y="' . $texty . '" font-family="Arial" text-anchor="middle" alignment-baseline="middle" dominant-baseline="middle">' . $text . '</text>
            <defs>
                <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                    <rect x="0" y="0" width="1" height="10" fill="#fff"/>
                    <rect x="9" y="0" width="1" height="10" fill="#fff"/>
                </pattern>
            </defs>
          </svg>';

        return response($body, '200')->header('Content-Type', 'image/svg+xml');
    }

    public function block(Request $request): Response
    {
        $repo = get('repo', 'text');
        $name = get('name', 'text');
        $file_path = storage_path("repository/$repo/assets/$name");

        if (!is_file($file_path)) {
            return response('Not Found', 404);
        }

        return response(file_get_contents($file_path))->withHeader('Content-Type', mime_content_type($file_path));
    }
}