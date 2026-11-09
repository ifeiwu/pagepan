<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title><?= $head_title ?? '' ?></title>

<link href="/favicon.ico" rel="icon" sizes="any">
<link href="/assets/admin/css/sp-ui.css" rel="stylesheet">

<script>
    var appvar = <?= json_encode([
            'user' => session('user') ?? [],
            'ver' => APP_VER
    ]) ?>;

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'
    }
</script>
<script src="/assets/admin/lib/datastar.js" type="module"></script>
<script src="/assets/admin/lib/sp-ui.js" type="module"></script>
<script src="/assets/admin/lib/jquery.js"></script>
<script src="/assets/admin/lib/master.js"></script>
<script src="/assets/admin/lib/require.js"></script>
<script src="/assets/admin/js/config.js"></script>
<script src="/assets/admin/lib/ku-modal.js"></script>

<?= $this->section('head') ?>