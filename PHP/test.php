<?php
include "./class/Db.php";
$db = new Db();
echo $db->test(date('Y-m-d H-i-s', 1650536780));
/* $time = 0;
echo date('Y-m-d H-i-s', $time); */