<?php
include "../class/Db.php";
session_start();
$db = new Db();
$db->authenticate();
$_SESSION["message"] = $db->updateLine($_POST["newName"], $_POST["id"], "exercices", "");
header("Location: ../index.php");