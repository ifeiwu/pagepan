<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title><?=$head_title ?? ''?> - 后台管理</title>

<link rel="icon" href="/favicon.ico" sizes="any">
<link href="/assets/admin/css/ui.css" rel="stylesheet">
<link href="/assets/admin/css/main.css" rel="stylesheet">

<script>
    const appvar = <?=json_encode2([
            'user' => session('user') ?? [],
            'ver' => APP_VER
    ])?>;
</script>
<script src="/assets/admin/lib/datastar.js" type="module"></script>
<script src="/assets/admin/lib/master.js"></script>
<script src="/assets/admin/lib/require.js"></script>
<script src="/assets/admin/js/config.js"></script>
<script src="/assets/admin/lib/ku-modal.js"></script>
<script>if ('scrollRestoration' in history) {history.scrollRestoration = 'manual'}</script>

<?=$this->section('head')?>