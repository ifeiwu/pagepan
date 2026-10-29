<?php

namespace app\admin\controller\repository;

use app\exception\DatastarAlertException;
use CzProject\GitPhp\Git;
use support\Db;
use support\Request;

class Add
{
    // 添加仓库
    public function index(Request $request): void
    {
        $url = trim($request->post('url'));
        $url_path = parse_url($url, PHP_URL_PATH);

        if (!preg_match('~^https://[^/]+/.+\.git$~i', $url)) {
            throw new DatastarAlertException('Git 仓库地址无效');
        }

        $path = preg_replace('/\.git$/i', '', trim($url_path, '/'));
        if (!$path || str_contains($path, '..')) {
            throw new DatastarAlertException('仓库路径无效');
        }

        $base_path = realpath(storage_path('repository'));
        if (!$base_path) {
            mkdir($base_path, 0755, true);
        }

        $save_path = $base_path . DIRECTORY_SEPARATOR . $path;

        try {
            putenv('GIT_TERMINAL_PROMPT=0'); // 禁止终端密码提示
            putenv('GCM_INTERACTIVE=never'); // 禁止 Git Credential Manager 的交互式认证

            $git = new Git;

            if (!is_dir($save_path . '/.git')) {
                $git->cloneRepository($url, $save_path);
            } else {
                $repo = $git->open($save_path);
                $repo->pull('origin');
            }
        } catch (\Throwable $e) {
            throw new DatastarAlertException($e->getMessage());
        }

        Db::beginTransaction();

        try {
            $db = db();

            $repo_id = $db->table('git_repo')->where('path', $path)->value('id');
            if (!$repo_id) {
                $repo_id = $db->table('git_repo')->insertGetId([
                    'path' => $path,
                    'url' => $url,
                    'created' => date('Y-m-d H:i:s'),
                ]);
            }

            $db->table('git_block')->where('repo_id', $repo_id)->delete();

            $blocks = $this->buildRepoBlocks($save_path, $repo_id);
            if ($blocks) {
                $db->table('git_block')->insert($blocks);
            }

            Db::commit();

            $ds = datastar();
            $ds->event('reload', [], 'select[name="repo_id"]');
            $ds->script('sp.dialog(AddDialog).hide()');
            $ds->close();
        } catch (\Throwable $ex) {
            Db::rollBack();
            throw new DatastarAlertException($ex->getMessage());
        }
    }

    // 构建仓库目录内容块列表
    private function buildRepoBlocks(string $basePath, int $repo_id): array
    {
        $list = [];

        foreach (glob($basePath . '/*/*/info.php') as $file) {
            $category = basename(dirname($file, 2));
            if ($category === 'components') {
                continue;
            }

            $info = require $file;
            if (!is_array($info)) {
                continue;
            }

            $content = file_get_contents(dirname($file) . DIRECTORY_SEPARATOR . 'block.php');
            // 包含 PHP 代码
            if (str_contains($content, '<?php') || str_contains($content, '<?=')) {
                $info['type'] = 'php';
            }

            $info['category'] = $category;
            $info['dirname'] = basename(dirname($file));
            $info['repo_id'] = $repo_id;

            $list[] = $info;
        }

        return $list;
    }
}