<?php
session_start();
include "./class/Db.php";
$db = new Db();
$db->authenticate();
$db->logout();