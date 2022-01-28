<?php
//нативно php сервер не умеет работать с json
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST);
//файл который работает на backend
//echo позволит нам увидеть те данные, которые нам приходят
//с сервера, var_dump вернет в строке данные
