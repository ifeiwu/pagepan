<?php

namespace site;

use utils\FS;
use utils\Log;

class Sitemap extends \Base{

    private $json_path;

    private $json_file;
    
    
    function __construct()
    {
        $this->json_path = WEB_ROOT . 'data/json/';
        $this->json_file = $this->json_path . 'sitemap.json';
        
        FS::rmkdir($this->json_path);
    }
    

    // 抓取站内链接
    protected function postCrawlUrls($request_data)
    {
        set_time_limit(0);
        
        $json_data = FS::jsonp($this->json_file);
        $json_data['crawlurls'] = [];
        
        FS::jsonp($this->json_file, $json_data);
        
        $baseUrl = $request_data['baseUrl'];
        $topDomain = $request_data['topDomain'];
        $maximumCrawlCount = intval($request_data['maximumCrawlCount']);
        $maximumDepth = intval($request_data['maximumDepth']);
        $concurrency = intval($request_data['concurrency']);
        $delayBetweenRequests = intval($request_data['delayBetweenRequests']);
        
        $crawler = \Spatie\Crawler\Crawler::create();
        
        $crawler->setCrawlProfile(new CrawlProfile1($topDomain));
            
        $crawler->setCrawlQueue(new \Spatie\Crawler\CrawlQueue\CollectionCrawlQueue);
        
        if ( $maximumCrawlCount > 0 )
        {
            $crawler->setMaximumCrawlCount($maximumCrawlCount);
        }
        
        if ( $maximumDepth > 0 )
        {
            $crawler->setMaximumDepth($maximumDepth);
        }
        
        $crawler->setConcurrency($concurrency);
        
        $crawler->setDelayBetweenRequests($delayBetweenRequests);

        $crawler->startCrawling($baseUrl);
        
        $crawlQueue = $crawler->getCrawlQueue();
        
        $crawlUrls = $crawlQueue->getUrls();
        
        foreach ($crawlUrls as $crawlurl)
        {
            $json_data['crawlurls'][] = (string) $crawlurl->url;
        }
        
        FS::jsonp($this->json_file, $json_data);
    }
    
    
    // 生成站点地图
    protected function postWrite($request_data)
    {
        $crawlurls = array_filter(explode("\r\n", trim($request_data['CrawlUrls'])));
        $appendurls = array_filter(explode("\r\n", trim($request_data['AppendUrls'])));

        $sitemap = new \samdark\sitemap\Sitemap(WEB_ROOT . 'sitemap.xml');

        if ( $crawlurls )
        {
            foreach ($crawlurls as $url)
            {
                $sitemap->addItem($url, time());
            }
        }
        
        if ( $appendurls )
        {
            foreach ($appendurls as $url)
            {
                $sitemap->addItem($url, time());
            }
        }

        $sitemap->write();
        
        
        $json_data = FS::jsonp($this->json_file);
        $json_data['appendurls'] = $appendurls;
        
        FS::jsonp($this->json_file, $json_data);

        return $this->_success();
    }

}


class CrawlProfile1 extends \Spatie\Crawler\CrawlProfile {
            
    private $topDomain;
    
    public function __construct($topDomain)
    {
        $this->topDomain = $topDomain;
    }

    public function shouldCrawl(\Psr\Http\Message\UriInterface $url): bool
    {
        $url = (string) $url;
        $url = parse_url($url, PHP_URL_HOST);
        
        // 过虑域名
        if ( stripos($url, $this->topDomain) !== false )
        {
            return true;
        }
        
        return false;
    }
}
