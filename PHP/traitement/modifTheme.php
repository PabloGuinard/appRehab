<?php
include "../class/Db.php";
session_start();
$db = new Db();
$db->authenticate();
$_SESSION["message"] = $db->updateLine($_POST["newName"], $_POST["id"], "themes");
header("Location: ../index.php");