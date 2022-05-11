<?php
include "../class/Db.php";
session_start();
$db = new Db();
$db->authenticate();
if($_POST["titreTheme"] != null){
    $_SESSION["message"] = $db->addTheme($_POST["titreTheme"], $_POST["dropCategorie"]);
} else {
    $_SESSION["message"] = "Thème vide";
}
header("Location: ../index.php");
