<?php

namespace app\admin\controller\repository;

use app\exception\DatastarAlertException;
use IvoPetkov\HTML5DOMDocument;
use support\Request;

class CopyCode
{
    // 复制内容块代码
    public function index(Request $request): void
    {
        $block_id = get('block_id', 'int');

        $db = db();
        $block = $db->table('git_block')->where('id', '=', $block_id)->first();
        $repo = $db->table('git_repo')->where('id', '=', $block->repo_id)->first();
        $block_path = "{$block->category}/{$block->dirname}";

        $base_path = storage_path("repository/{$repo->path}/$block_path");

        $block_file = "$base_path/block.php";
        if (!is_file($block_file)) {
            throw new DatastarAlertException('找不到文件');
        }

        $setting_file = "$base_path/setting.php";
        $setting = null;
        if (is_file($setting_file)) {
            $setting = include $setting_file;
            $setting['repo.path'] = $repo->path;
            $setting = json_encode($setting);
        }

        $dom = new HTML5DOMDocument();

        // 保护 PHP 代码，避免注释
        $php = [];
        $content = file_get_contents($block_file);
        $content = preg_replace_callback('/<\?(?:php|=)[\s\S]*?\?>/', function ($matches) use (&$php) {
            $key = 'PHP_BLOCK_' . count($php) . '_TOKEN';
            $php[$key] = $matches[0];
            return $key;
        }, $content);

        // 内容块添加属性
        $dom->loadHTML("<!DOCTYPE html><html><body>{$content}</body></html>", HTML5DOMDocument::ALLOW_DUPLICATE_IDS);
        $node = $dom->querySelector('body>*');
//        $node->setAttribute('data-block-id', $block->block_id);
        $node->setAttribute('data-block-type', $block->type);
        $node->setAttribute('data-block-path', $block_path);
        $setting && $node->setAttribute('data-block-setting', $setting);

        // 还原 PHP 代码
        $content = strtr($node->outerHTML, $php);


        $ds = datastar();
        $ds->script("copyTextToClipboard(`{$content}`);");
        $ds->close();
    }
}