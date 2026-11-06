<!DOCTYPE html>
<html lang="zh">
<head>
    <?=$this->insert('layout/head')?>

    <link href="/assets/admin/css/builder.css" rel="stylesheet">

    <script>
        appvar.page = <?=json_encode($this->page)?>
    </script>
</head>
<body>
    <?=$this->section('content')?>

    <script src="/assets/admin/js/main.js"></script>
</body>
</html>
