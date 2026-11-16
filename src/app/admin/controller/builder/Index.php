<?php

namespace app\admin\controller\builder;

use support\Request;
use support\Response;

class Index
{
    public function modal(Request $request): void
    {
        $page_id = $request->get('page_id');
        $edit_mode = request()->cookie('builder-edit-mode', 'design');

        $html = view2()->render('builder/modal', [
            'edit_mode' => $edit_mode,
            'page_id' => $page_id,
        ]);

        $ds = datastar();
        $ds->replace($html);
        $ds->script('BuilderModal.show()');
        $ds->close();
    }

    public function switch(Request $request): Response
    {
        $edit_mode = get('edit_mode', 'text', 'design');
        $page_id = get('page_id', 'int');

        $db = db();
        $page = $db->table('page')->where('id', $page_id)->first();
        $domain = $db->table('site')->where('name', 'domain')->value('value');

        $response = view2()->display("builder/$edit_mode", [
            'edit_mode' => $edit_mode,
            'domain' => $domain,
            'page' => $page,
            'page_url' => "{$domain}{$page->path}"
        ]);

        $response->cookie('builder-edit-mode', $edit_mode);

        return $response;
    }

}
