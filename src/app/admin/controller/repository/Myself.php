<?php

namespace app\admin\controller\repository;

use app\exception\DatastarAlertException;
use support\FileSystem;
use support\Request;
use support\Response;
use Workerman\Coroutine;
use Workerman\Timer;

class Myself
{
    public function openBlockPopover(Request $request): void
    {

        $html = view2()->render('repository/myself/block-popover');

        $ds = datastar();
        $ds->replace($html);
        $ds->script('sp.popover(document.querySelector("#popover-myself-block")).show()');
        $ds->close();
    }

    public function saveBlock(Request $request): Response
    {
        $submit = post('submit', 'text');
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
        $page_id = post('page_id', 'int');
        $page = $db->table('page')->where('id', '=', $page_id)->first();
        if (empty($page)) {
            return json_error('获取页面信息失败');
        }
        $page_path = $page->path;

        $repo_id = 1;
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

        Coroutine::create(function(){
            Timer::sleep(1.5);
            echo "hello coroutine\n";
        });

        // 删除之前截图
        $screenshot_file = storage_path("page/screenshot/{$page_path}.webp");
        @unlink($screenshot_file);

        // 页面截图
        $host = $request->header('x-forwarded-proto') . '://' . $request->host();
        run_script('screenshot.php', $host, $page_path);
        // 内容块写入文件
        $webp_content = file_get_contents($screenshot_file);
        $info_content = "<?php return ['keywords' => '', 'description' => ''];";
        file_put_contents("$save_path/info.php", $info_content);
        file_put_contents("$save_path/cover.webp", $webp_content);
        file_put_contents("$save_path/block.php", $content);

        return json_success();
//        $blocks = $this->buildRepoBlocks($save_path, $repo_id);
//        if ($blocks) {
//            $db->table('git_block')->insert($blocks);
//        }

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