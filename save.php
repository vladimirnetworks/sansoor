<?php
$img = $_POST['img'];

$img = str_replace('data:image/jpeg;base64,', '', $img);
$img = str_replace('data:image/png;base64,', '', $img);

$img = str_replace(' ', '+', $img);
$data = base64_decode($img);


$e = strtolower(pathinfo($_POST['fname'], PATHINFO_EXTENSION));

if ($e == "jpg" || $e == "jpeg" || $e == "png") {
	file_put_contents($_POST['fname'], $data);
}



?>