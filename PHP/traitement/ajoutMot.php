<?php
include "../class/Db.php";
session_start();
$db = new Db();
$db->authenticate();
$_SESSION["message"] = $db->addMot($_POST["titreMot"], $_POST["textDef"]);
header("Location: ../viewLexique.php");
