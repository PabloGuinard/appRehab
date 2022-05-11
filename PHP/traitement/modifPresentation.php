<?php
include "../class/Db.php";
session_start();
$db = new Db();
$db->authenticate();
$_SESSION["message"] = $db->updatePresentation($_POST["newText"]);
header("Location: ../index.php");