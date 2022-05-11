<?php session_start();
include 'class/Db.php';
$db = new Db();
$db->authenticate();

$_SESSION["message"] = $db->setIsReadyTrue();

header("Location: index.php");
?>
