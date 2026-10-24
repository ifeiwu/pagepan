<?php

namespace app\admin\controller\blocks;

use app\exception\DatastarAlertException;
use CzProject\GitPhp\Git;
use support\Db;
use support\Request;

class Repository
{
    // 添加仓库
    public function add(Request $request)
    {
        $url = $request->post('url');
        $path = trim(parse_url($url, PHP_URL_PATH), '/');
        $path = preg_replace('/\.git$/', '', $path);
        $save_path = storage_path("repository/$path");

        try {
            $git = new Git;

            exec('git ls-remote --heads ' . escapeshellarg($url) . ' 2>&1', $output, $code);
            if ($code !== 0) {
                throw new DatastarAlertException('Git 仓库无效或无法访问：' . $output);
            }

            if (!is_dir($save_path . '/.git')) {
                // 首次克隆
                $git->cloneRepository($url, $save_path);
            } else {
                // 已存在，拉取更新
                $repo = $git->open($save_path);
                $repo->pull('origin');
            }
        } catch (\Throwable $e) {
            throw new DatastarAlertException($e->getMessage());
        }

        Db::beginTransaction();

        try {
            // 保存仓库信息
            $db = db();

            // 添加仓库
            $repo_id = $db->table('git_repo')->where(['path' => $path])->value('id');
            if (!$repo_id) {
                $repo_id = $db->table('git_repo')->insertGetId([
                    'path' => $path,
                    'url' => $url,
                    'created' => date('Y-m-d H:i:s'),
                ]);
            }

            // 获取内容块列表
            $blocks = $this->buildRepoBlocks($save_path, $repo_id);

            // 保存仓库内容块
            $db->table('git_block')->where('repo_id', $repo_id)->delete();
            $db->table('git_block')->insert($blocks);

            Db::commit();

            $ds = datastar();
            $ds->script('AddModal.close()');
            $ds->close();
        } catch (\Throwable $ex) {
            Db::rollBack();
            throw new DatastarAlertException($ex->getMessage());
        }
    }

    // 构建仓库目录内容块列表
    private function buildRepoBlocks($basePath, $repo_id): array
    {
        $list = [];

        foreach (glob($basePath . '/*/*/info.php') as $file) {
            $info = require $file;
            if (!is_array($info)) {
                continue;
            }
            $info['category'] = basename(dirname($file, 2));
            $info['dirname'] = basename(dirname($file));
            $info['repo_id'] = $repo_id;
            $list[] = $info;
        }

        return $list;
    }

    /*public function check(Request $request)
    {
        $url = $request->post('url');
        $name = basename(parse_url($url, PHP_URL_PATH), '.git');
        $path = storage_path("repository/$name");

        $git = new Git;
        if (!$git->isRemoteUrlReadable($url)) {
            throw new DatastarAlertException('Git 仓库无效或无法访问');
        }

        try {
            $repo = $git->open($path);
            $repo->execute('fetch origin');

            $local = trim($repo->execute('rev-parse HEAD'));
            $remote = trim($repo->execute('rev-parse origin/main'));
        } catch (\Throwable $e) {
            throw new DatastarAlertException($e->getMessage());
        }

        if ($local === $remote) {
            echo '远程仓库没有更新';
        } else {
            echo '远程仓库有更新';
        }
    }*/
}