<?php

namespace app\admin\controller\repository;

use app\exception\DatastarAlertException;
use support\Db;
use support\Request;

class Delete
{
    public function index(Request $request): void
    {
        $db = db();
        $ds = datastar();
        $repo_id = $ds->getSignals('repo_id');

        try {
            $db->transaction(function () use ($db, $repo_id) {
                $repo_path = $db->table('git_repo')
                    ->where('id', $repo_id)
                    ->value('path');

                if (!$repo_path) {
                    throw new \Exception('仓库不存在');
                }

                // 检查仓库目录
                $base_path = realpath(storage_path('repository'));
                $full_path = realpath(storage_path("repository/$repo_path"));

                if ($full_path) {
                    if (
                        !$base_path ||
                        !str_starts_with($full_path, $base_path . DIRECTORY_SEPARATOR) ||
                        !is_dir($full_path . DIRECTORY_SEPARATOR . '.git')
                    ) {
                        throw new \Exception('仓库目录无效');
                    }

                    // 删除仓库目录
                    if (PHP_OS_FAMILY === 'Windows') {
                        exec('rmdir /s /q ' . escapeshellarg($full_path), $output, $code);
                    } else {
                        exec('rm -rf -- ' . escapeshellarg($full_path), $output, $code);
                    }

                    if ($code !== 0) {
                        throw new \Exception('删除仓库目录失败');
                    }
                }

                // 删除数据库记录
                $db->table('git_block')->where('repo_id', $repo_id)->delete();
                $db->table('git_repo')->where('id', $repo_id)->delete();
            });

            $ds->event('reload', [], 'select[name="repo_id"]');
            $ds->close();

        } catch (\Throwable $e) {
            throw new DatastarAlertException($e->getMessage());
        }
    }

    /*public function index(Request $request): void
    {
        $db = db();
        $ds = datastar();
        $repo_id = $ds->getSignals('repo_id');

        Db::beginTransaction();

        try {
            $repo_path = $db->table('git_repo')->where('id', $repo_id)->value('path');

            if (!$repo_path ||
                !$db->table('git_repo')->where('id', $repo_id)->delete() ||
                !$db->table('git_block')->where('repo_id', $repo_id)->delete()) {
                throw new \Exception('删除失败');
            }

            $base_path = realpath(storage_path('repository'));
            $full_path = realpath(storage_path("repository/$repo_path"));

            if (
                !$base_path ||
                !$full_path ||
                !str_starts_with($full_path, $base_path . DIRECTORY_SEPARATOR) ||
                !is_dir($full_path . DIRECTORY_SEPARATOR . '.git')
            ) {
                if (is_dir($full_path)) {
                    throw new \Exception('仓库目录无效');
                }
            } else {
                if (PHP_OS_FAMILY === 'Windows') {
                    exec('rmdir /s /q ' . escapeshellarg($full_path), $output, $code);
                } else {
                    exec('rm -rf -- ' . escapeshellarg($full_path), $output, $code);
                }

                if ($code !== 0) {
                    throw new \Exception('删除目录失败');
                }
            }

            Db::commit();

            $ds->event('reload', [], 'select[name="repo_id"]');
            $ds->close();
        } catch (\Throwable $ex) {
            Db::rollBack();
            throw new DatastarAlertException($ex->getMessage());
        }
    }*/
}