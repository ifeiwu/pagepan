<?php

namespace app\admin\controller\repository;

use app\exception\DatastarAlertException;
use CzProject\GitPhp\Git;
use support\Db;
use support\Request;

class ClonePull
{
    // 添加仓库
    /*public function index(Request $request): void
    {
        $ds = datastar();

        $repo_id = post('repo_id', 'text');
        if ($repo_id) {
            // 拉取更新
            $repo = db()->table('git_repo')->where('id', $repo_id)->first();
            $path = $repo->path;
            $url = $repo->url;
        } else {
            // 添加仓库
            $url = trim($request->post('url'));
            $url_path = parse_url($url, PHP_URL_PATH);

            if (!preg_match('~^https://[^/]+/.+\.git$~i', $url)) {
                throw new DatastarAlertException('Git 仓库地址无效');
            }

            $path = preg_replace('/\.git$/i', '', trim($url_path, '/'));
            if (!$path || str_contains($path, '..')) {
                throw new DatastarAlertException('仓库路径无效');
            }
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


            $ds->event('reload', [], 'select[name="repo_id"]');
            $ds->script('sp.dialog(AddDialog).hide()');
            $ds->script("sp.toast.success('Event has been created', {position:'top-center'})");
            $ds->close();
        } catch (\Throwable $ex) {
            Db::rollBack();
            throw new DatastarAlertException($ex->getMessage());
        }
    }*/

    public function index(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $repo_id = post('repo_id', 'text');

        if ($repo_id) {
            // 拉取更新
            $repo = $db->table('git_repo')->where('id', $repo_id)->first();
            if (!$repo) {
                throw new DatastarAlertException('仓库不存在');
            }

            $path = $repo->path;
            $url = $repo->url;
        } else {
            // 添加仓库
            $url = trim($request->post('url'));
            if (!preg_match('~^https://[^/]+/.+\.git$~i', $url)) {
                throw new DatastarAlertException('Git 仓库地址无效');
            }

            $url_path = parse_url($url, PHP_URL_PATH);
            $path = preg_replace('/\.git$/i', '', trim($url_path, '/'));
            if (!$path || str_contains($path, '..') || str_contains($path, '\\')) {
                throw new DatastarAlertException('仓库路径无效');
            }
        }

        // 创建仓库根目录
        $base_path = storage_path('repository');
        if (!is_dir($base_path) && !mkdir($base_path, 0755, true) && !is_dir($base_path)) {
            throw new DatastarAlertException('无法创建仓库目录');
        }

        $base_path = realpath($base_path);
        $save_path = $base_path . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $path);

        try {
            putenv('GIT_TERMINAL_PROMPT=0');
            putenv('GCM_INTERACTIVE=never');

            $git = new Git;

            if (!is_dir($save_path . '/.git')) {
                if (!is_dir(dirname($save_path))) {
                    mkdir(dirname($save_path), 0755, true);
                }
                $git->cloneRepository($url, $save_path);
            } else {
                $repo = $git->open($save_path);
                $repo->pull('origin');
            }
        } catch (\Throwable $e) {
            throw new DatastarAlertException($e->getMessage());
        }

        try {
            $db->transaction(function () use ($db, $path, $url, $save_path, &$repo_id) {
                if (!$repo_id) {
                    $repo_id = $db->table('git_repo')->where('path', $path)->value('id');
                    if (!$repo_id) {
                        $repo_id = $db->table('git_repo')->insertGetId([
                            'path' => $path,
                            'url' => $url,
                            'created' => date('Y-m-d H:i:s'),
                        ]);
                    }
                }

                // 同步区块
                $db->table('git_block')->where('repo_id', $repo_id)->delete();

                $blocks = $this->buildRepoBlocks($save_path, $repo_id);
                if ($blocks) {
                    $db->table('git_block')->insert($blocks);
                }
            });
        } catch (\Throwable $e) {
            throw new DatastarAlertException($e->getMessage());
        }

        $ds->event('reload', [], 'select[name="repo_id"]');
        $ds->script('sp.dialog(AddDialog).hide()');
        $ds->script("sp.toast.success('内容块已更新', {position:'top-center'})");
        $ds->close();
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

            $info['type'] = '';
            $info['id'] = bin2hex(random_bytes(16));
            $info['category'] = $category;
            $info['name'] = basename(dirname($file));
            $info['repo_id'] = $repo_id;

            // 包含 PHP 代码
            $content = file_get_contents(dirname($file) . DIRECTORY_SEPARATOR . 'block.php');
            if (str_contains($content, '<?php') || str_contains($content, '<?=')) {
                $info['type'] = 'php';
            }

            $list[] = $info;
        }

        return $list;
    }
}