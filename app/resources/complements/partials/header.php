<?php if (isset($oVista["subtitulo"])) : ?>
    <h4 class="py-3 mb-4"><span class="text-muted fw-light"><?= $oVista["subtitulo"]; ?> /</span> <?= $oVista["titulo"]; ?></h4>
<?php else : ?>
    <h4 class="py-3 mb-4"><span class="text-muted fw-light"><?= $oVista["titulo"]; ?></span></h4>
<?php endif ?>