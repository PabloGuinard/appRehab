<?php
include "../class/Db.php";
session_start();
$db = new Db();
$_SESSION["message"] = $db->updateLine($_POST["newName"], $_POST["id"], "Themes");
header("Location: ../index.php");