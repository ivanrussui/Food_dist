<?php 
// все что приходит от клиента мы будем декодировать в JSON

// это чтобы на php получить JSON данные// команда var_dump(массив данных)
$_POST = json_decode(file_get_contents('php://input'), true); // комментим если делаем через fetch() и FormData

echo var_dump($_POST); // это команда берет данные приходящие от клиента, превращает их в строку и показывает их на клиенте