<?php
// 网站页面解析输出
class Pager {

    private $db;

    private $view;

    /**
     * 单例设计模式
     * @var object
     */
    private static $_instance;

    public static function new() {
        if ( ! (self::$_instance instanceof self) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    private function __construct() {
        $this->db = db();
        $this->view = view();
    }

    // 显示页面内容
    function display($data = []) {
        // 站点信息
        $site = $this->db->select('site', ['name', 'value'], ['state', '=', 1]);
        $site = helper('arr/tokv', [$site]);
        $this->view->assign('site', $site);
        // 页面别名
        $alias = $data['alias'];
        $alias = str_replace('.html', '', $alias); // 删除伪静态后缀.html
        $page = $this->getPageInfo($alias);
        // 页面数据
        $this->view->assign('pagevar', [
            'rooturl' => ROOT_URL,
            'baseurl' => BASE_URL,
            'domain' => Request::domain(),
            'domain3' => $site['domain3'] ?: '',
            'timestamp' => $site['timestamp'],
            'page_id' => $page['id'],
            'page_alias' => $page['alias'],
            'page_title' => $page['title'],
            'get_alias' => $data['alias'] ?: '',
            'get_id' => $data['id'] ?: '',
            'get_cid' => $data['cid'] ?: '', // 分类 id
            'get_tag' => $data['tag'] ?: '',
            'get_keyword' => $data['keyword'] ?: '',
            'get_pagenum' => $data['pagenum'] ?: '',
        ]);

        // 没有找到页面，尝试执行/app/目录下定义的文件回调函数。
        if ( ! $page ) {
            $route_file = APP_PATH . "{$page['alias']}.php";
            if ( is_file($route_file) ) {
                (require $route_file)();
            } else {
                $this->error(404);
            }
        }

        // 缓存配置
        if ( $page['cache'] == 1 ) {
            $cache_path = CACHE_PATH . "page/$alias"; // 缓存路径
            $cache_file = $cache_path . '/' . md5(Request::url()); // 缓存文件
            if ( is_file($cache_file) ) {
                echo file_get_contents($cache_file);
            } else {
                echo $content = $this->getPageContent($page);
                $this->cachePage($cache_path, $cache_file, $content);
            }
        } else {
            echo $this->getPageContent($page);
        }
    }

    // 返回完整的页面内容
    function getPageContent($page) {
        // SEO 变量设置
        $this->setPageSEO($page);

        // 除了专页以外的页面
        if ( $page['type'] != 'pro' ) {
            $page_content = gzuncompr($page['content']);
        } else {
            $page_content = file_get_contents(APP_PATH . "{$page['alias']}.phtml");
        }

        // 使用页面布局
        $layout_alias = $page['layout'];
        if ( $layout_alias ) {
            $layout = $this->db->find('page', ['body', 'content'], [['state', '=', 1], 'AND', ['alias', '=', $layout_alias]]);
            $layout_content = $layout['content'];
            $layout_content = gzuncompr($layout_content);

            // 兼容之前网站布局
            if ( strpos($layout_content, '{__CONTENT__}') ) {
                $layout_content = str_replace('{__CONTENT__}', '<?=$this->section(\'content\')?>', $layout_content);
            }

            $page_content = $this->view->parse($page_content);
            // 默认页面内容，表示页面有部分组件没有添加布局属性，如: <div layout-section="content"></div>
            if ( $page_content ) {
                $this->view->addSection('content', $page_content);
            }
            // 页面内容添加到布局页面
            $page_content = $this->view->parse($layout_content);
        }
        // 未使用页面布局
        else {
            $page_content = $this->view->parse($page_content);
        }

        $this->view->assign('page_body_attrs', $this->getPageBodyAttrs($page, $layout));

        // 页面内容添加到页面框架
        if ( $page_content ) {
            $this->view->addSection('frame-content', $page_content);
        }

        return $this->view->render('layout/frame');
    }

    // 返回查询的页面内容
    function getPageInfo($alias) {
        $columns = 'id,type,cache,layout,alias,title,seo,body,content';
        // 指定页面别名
        if ( $alias ) {
            $page = $this->db->find('page', $columns, [['state', '=', 1], 'AND', ['alias', '=', $alias], 'AND', ['type', '!=', 'dataset']]);
        }
        // 未指定页面别名自动寻找页面
        else {
            // 引导页
            $page = $this->db->find('page', $columns, [['state', '=', 1], 'AND', ['type', '=', 'guide']]);
            // 首页
            if ( ! $page ) {
                $page = $this->db->find('page', $columns, [['state', '=', 1], 'AND', ['type', '=', 'home']]);
            }
            // 专页
            if ( ! $page ) {
                // 查询专页首页，别名可以是空字符串或 index
                $page = $this->db->find('page', $columns, [['state', '=', 1], 'AND', ['type', '=', 'pro'], 'AND', ['alias', 'IN', ['index', '']]]);
                $page['alias'] = 'index';
            }
        }

        return $page;
    }


    // 设置页面 SEO 标签
    function setPageSEO($page) {
        if ( $seo = $page['seo'] ) {
            $seo = json_decode($seo, true);
            $seo_title = $seo['title'];
            $seo_subtitle = '';
            // 首页站点名称放在前面
            if ( $page['type'] == 'home' ) {
                $seo_subtitle = false;
                $seo_title = $this->view->site['name'] . ' - ' . $seo_title;
            }

            $this->view->seo($seo_title, $seo_subtitle, $seo['keywords'], $seo['description']);
        }
    }

    // 显示 404 页面
    function error($code = 404) {
        Response::status($code);
        // 只有 GET 请求才会显示页面
        if ( Request::isGet() ) {
            $page = $this->db->find('page', ['seo', 'content'], [['state', '=', 1], 'AND', ['type', '=', '404']]);
            // 定制 404 页面
            if ( $page ) {
                $this->setPageSEO($page);
                $this->view->addSection('content', gzuncompr($page['content']));
                echo $this->view->render('layout/frame');
            }
            // 默认 404 页面
            else {
                $this->view->layout('layout/frame');
                $this->view->display('error/404');
            }
        }
        exit;
    }

    // 获取布局+页面<body>标签属性
    function getPageBodyAttrs($page, $layout) {
        $page_body = $page['body'];
        $layout_body = $layout['body'];

        if ( $page_body ) {
            $page_body = json_decode(html_decode($page_body), true);
        }

        if ( $layout_body ) {
            $layout_body = json_decode(html_decode($layout_body), true);
        }

        // 合并布局+页面<body>标签属性
        if ( is_array($page_body) && is_array($layout_body) ) {
            $page_body = array_merge_recursive($layout_body, $page_body);
            foreach ($page_body as $name => $value) {
                if ( is_array($value) ) {
                    $value = array_unique($value);
                } else {
                    $value = explode(' ', $value);
                }

                $page_body[$name] = implode(' ', $value);
            }
        }
        // 只有布局页面设置<body>标签属性
        elseif ( is_array($layout_body) ) {
            $page_body = $layout_body;
        }

        // 拼接标签属性
        $page_body_attrs = '';
        if ( is_array($page_body) ) {
            foreach ($page_body as $key => $value) {
                $page_body_attrs .= $key . '="' . str_replace('"', '\'', $value) . '" ';
            }
        }

        return $page_body_attrs;
    }

    // 缓存页面内容
    function cachePage($cache_path, $cache_file, $html) {
        if ( ! is_dir($cache_path) ) {
            if ( ! mkdir($cache_path, 0755, true) ) {
                exit("Permission denied: {$cache_path}");
            }
        }

        try {
            loader_vendor();
            $parser = WyriHaximus\HtmlCompress\Factory::constructSmallest();
            file_put_contents($cache_file, $parser->compress($html));
        } catch (Throwable $e) {
            file_put_contents($cache_file, $html);
        }
    }
}