<?php
include "../class/Db.php";
session_start();
$db = new Db();
$db->authenticate();
$_SESSION["message"] = $db->updateMot($_POST["titreMot"], $_POST["textDef"], $_POST["id"]);
header("Location: ../viewLexique.php");
