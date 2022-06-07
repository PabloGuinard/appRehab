<?php
include "./class/Db.php";
$db = new Db();
echo sizeOf($db->getCategories());