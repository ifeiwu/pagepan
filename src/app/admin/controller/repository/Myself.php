<?php

namespace app\admin\controller\repository;

use app\exception\DatastarAlertException;
use support\FileSystem;
use support\Request;
use Workerman\Timer;

class Myself
{
    public function openBlockPopover(Request $request): void
    {

        $html = view2()->render('repository/myself/block-popover');

        $ds = datastar();
        $ds->replace($html);
        $ds->script('sp.popover(document.querySelector("#popover-myself-block")).toggle()');
        $ds->close();
    }

    public function saveBlock(Request $request): void {
        $ds = datastar();
        $db = db();

        $submit = post('submit', 'text');
        $category = post('category', 'text');
        $name = post('name', 'text');
        $content = post('content');

        if (!$category) {
            throw new DatastarAlertException('请输入分类');
        }
        if (!$name) {
            throw new DatastarAlertException('请输入名称');
        }
        if (!$content) {
            throw new DatastarAlertException('请输入内容');
        }

        $repo_id = 1;
        $repo = $db->table('git_repo')->where('id', $repo_id)->first();
        if (!$repo) {
            throw new DatastarAlertException('仓库不存在');
        }
        $path = $repo->path;

        // 创建仓库根目录
        $base_path = storage_path('repository');
        if (!is_dir($base_path) && !mkdir($base_path, 0755, true) && !is_dir($base_path)) {
            throw new DatastarAlertException('无法创建仓库目录');
        }

        $base_path = realpath($base_path);
        $save_path = $base_path . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, "$path/$category/$name");

        if (!is_dir($save_path)) {
            mkdir($save_path, 0755, true);
        }

        $info_content = "<?php return ['keywords' => '', 'description' => ''];";
        file_put_contents("$save_path/info.php", $info_content);
        file_put_contents("$save_path/block.php", $content);

        // 内容块写入文件
        $file = app_path("view/myself/block.phtml");
        if (FileSystem::rmkdir($file)) {
            $content = htmlspecialchars_decode($content, ENT_QUOTES);
            if (file_put_contents($file, $content) === false) {
                throw new DatastarAlertException('保存页面文件失败');
            }
        } else {
            throw new DatastarAlertException("创建目录失败：" . dirname($file));
        }

        // 页面截图
        try {
            $host = $request->header('x-forwarded-proto') . '://' . $request->host();
            run_script('screenshot.php', $host, 'myself/block');
        } catch (\Exception $e) {
            throw new DatastarAlertException($e->getMessage());
        }

var_dump('000000');

//        $blocks = $this->buildRepoBlocks($save_path, $repo_id);
//        if ($blocks) {
//            $db->table('git_block')->insert($blocks);
//        }
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