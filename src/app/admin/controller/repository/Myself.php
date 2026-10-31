<?php

namespace app\admin\controller\repository;

use support\FileSystem;
use support\Request;
use support\Response;
use Workerman\Timer;

class Myself
{
    public function openBlockPopover(Request $request): void
    {
        $db = db();

        $repo_id = 1;
        $categorys = $db->table('git_block')->where(['repo_id' => $repo_id])->groupBy('category')->pluck('category')->toArray();

        $html = view2()->render('repository/myself/block-popover', ['categorys' => $categorys]);

        $ds = datastar();
        $ds->replace($html);
        $ds->script('sp.popover(document.querySelector("#popover-myself-block")).show()');
        $ds->close();
    }

    // 保存内容块
    public function saveBlock(Request $request): Response
    {
        $repo_id = 1;
        $category = post('category', 'text');
        $name = post('name', 'text');
        $content = post('content');

        if (!$category) return json_error('请输入分类');
        if (!$name) return json_error('请输入名称');
        if (!$content) return json_error('请输入内容');

        $db = db();

        // 获取页面信息
        $page_id = post('page_id', 'int');
        $page = $db->table('page')->where('id', $page_id)->first();
        if (!$page) return json_error('获取页面信息失败');

        // 获取仓库信息
        $repo = $db->table('git_repo')->where('id', $repo_id)->first();
        if (!$repo) return json_error('仓库不存在');

        // 保存页面内容
        $file = app_path("view/page/{$page->path}.phtml");
        $content = htmlspecialchars_decode($content, ENT_QUOTES);
        if (!$this->savePageFile($file, $content)) return json_error('保存页面文件失败');

        // 获取截图
        $webp_content = $this->createScreenshot($request, $page->path);
        if ($webp_content === false) return json_error('截图失败或超时');

        // 保存内容块文件
        $save_path = $this->getBlockPath($repo->path, $category, $name);
        if (!$save_path) return json_error('创建内容块目录失败');

        if (!$this->saveBlockFiles($save_path, $content, $webp_content)) {
            return json_error('保存内容块文件失败');
        }

        // 保存数据库记录
        if (!$this->saveBlockRecord($db, $repo_id, $category, $name, $content)) {
            return json_error('添加内容块失败');
        }

        return json_success('ok');
    }

    // 保存页面文件
    private function savePageFile(string $file, string $content): bool
    {
        if (!FileSystem::rmkdir($file)) return false;

        return file_put_contents($file, $content) !== false;
    }

    // 生成截图
    private function createScreenshot(Request $request, string $page_path): string|false
    {
        $screenshot_file = storage_path("page/screenshot/{$page_path}.webp");
        $done_file = $screenshot_file . '.done';

        @unlink($screenshot_file);
        @unlink($done_file);

        $host = $request->header('x-forwarded-proto') . '://' . $request->host();
        run_script('screenshot.php', $host, $page_path);

        // 等待截图完成，最多等待 5 秒
        $start = microtime(true);
        while (!is_file($done_file)) {
            if (microtime(true) - $start > 5) return false;
            Timer::sleep(0.1);
        }

        $content = file_get_contents($screenshot_file);

        @unlink($screenshot_file);
        @unlink($done_file);

        return $content === false ? false : $content;
    }

    // 获取内容块目录
    private function getBlockPath(string $repo_path, string $category, string $name): string|false
    {
        $base_path = storage_path('repository');
        if (!is_dir($base_path) && !mkdir($base_path, 0755, true) && !is_dir($base_path)) return false;

        $base_path = realpath($base_path);
        $save_path = $base_path . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, "$repo_path/$category/$name");

        if (!is_dir($save_path) && !mkdir($save_path, 0755, true) && !is_dir($save_path)) return false;

        return $save_path;
    }

    // 保存内容块文件
    private function saveBlockFiles(string $save_path, string $content, string $webp_content): bool
    {
        $info_content = "<?php return ['keywords' => '', 'description' => ''];";

        return file_put_contents("$save_path/info.php", $info_content) !== false
            && file_put_contents("$save_path/cover.webp", $webp_content) !== false
            && file_put_contents("$save_path/block.php", $content) !== false;
    }

    // 保存数据库记录
    private function saveBlockRecord($db, int $repo_id, string $category, string $name, string $content): bool
    {
        $table = $db->table('git_block');

        if ($table->where([['repo_id', '=', $repo_id], ['category', '=', $category], ['name', '=', $name]])->exists()) {
            return true;
        }

        $type = str_contains($content, '<?php') || str_contains($content, '<?=') ? 'php' : '';

        return $table->insert([
            'id' => bin2hex(random_bytes(16)),
            'repo_id' => $repo_id,
            'category' => $category,
            'name' => $name,
            'type' => $type,
            'keywords' => '',
            'description' => ''
        ]);
    }

    /*public function saveBlock(Request $request): Response
    {
        $repo_id = 1;
        $category = post('category', 'text');
        $name = post('name', 'text');
        $content = post('content');

        if (!$category) {
            return json_error('请输入分类');
        }
        if (!$name) {
            return json_error('请输入名称');
        }
        if (!$content) {
            return json_error('请输入内容');
        }

        $db = db();

        // 获取页面信息
        $page_id = post('page_id', 'int');
        $page = $db->table('page')->where('id', '=', $page_id)->first();
        if (empty($page)) {
            return json_error('获取页面信息失败');
        }
        $page_path = $page->path;

        // 获取自己的仓库信息
        $repo = $db->table('git_repo')->where('id', $repo_id)->first();
        if (!$repo) {
            return json_error('仓库不存在');
        }
        $repo_path = $repo->path;

        // 创建仓库根目录
        $base_path = storage_path('repository');
        if (!is_dir($base_path) && !mkdir($base_path, 0755, true) && !is_dir($base_path)) {
            return json_error('无法创建仓库目录');
        }

        $base_path = realpath($base_path);
        $save_path = $base_path . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, "$repo_path/$category/$name");
        if (!is_dir($save_path)) {
            mkdir($save_path, 0755, true);
        }

        // 写入页面文件
        $file = app_path("view/page/{$page_path}.phtml");
        if (FileSystem::rmkdir($file)) {
            $content = htmlspecialchars_decode($content, ENT_QUOTES);
            if (file_put_contents($file, $content) === false) {
                return json_error('保存页面文件失败');
            }
        } else {
            return json_error("创建目录失败：" . dirname($file));
        }

        // 删除之前截图
        $screenshot_file = storage_path("page/screenshot/{$page_path}.webp");
        $done_file = $screenshot_file . '.done';

        // 异步执行截图
        $host = $request->header('x-forwarded-proto') . '://' . $request->host();
        run_script('screenshot.php', $host, $page_path);

        // 等待截图完成，最多等待 5 秒
        $timeout = 5;
        $start = microtime(true);
        while (!is_file($done_file)) {
            if (microtime(true) - $start > $timeout) {
                return json_error('截图超时');
            }
            Timer::sleep(1);
        }

        $webp_content = file_get_contents($screenshot_file);
        if ($webp_content === false) {
            return json_error('读取截图失败');
        }

        // 删除截图文件
        @unlink($screenshot_file);
        @unlink($done_file);

        // 保存数据到自己的仓库目录
        $info_content = "<?php return ['keywords' => '', 'description' => ''];";
        file_put_contents("$save_path/info.php", $info_content);
        file_put_contents("$save_path/cover.webp", $webp_content);
        file_put_contents("$save_path/block.php", $content);

        $table = $db->table('git_block');

        if (!$table->where([['repo_id', '=', $repo_id], ['category', '=', $category], ['name', '=', $name]])->exists()) {
            $table->dump();
            $data = ['repo_id' => $repo_id, 'category' => $category, 'name' => $name];
            $data['id'] =  bin2hex(random_bytes(16));
            // 包含 PHP 代码
            $data['type'] = '';
            if (str_contains($content, '<?php') || str_contains($content, '<?=')) {
                $data['type'] = 'php';
            }
            if (!$table->insert($data)) {
                return json_error("添加内容块失败");
            }
        }

        return json_success('ok');
    }*/

}