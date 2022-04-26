<?php
include "../class/Db.php";
session_start();
$db = new Db();
$_SESSION["message"] = $db->updateExercice($_POST["newName"], $_POST["id"]);
header("Location: ../index.php");