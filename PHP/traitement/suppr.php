<?php
include "../class/Db.php";
session_start();
$db = new Db();
switch ($_POST["typeSuppr"]){
    case "Exercice":
        $_SESSION["message"] = $db->deleteLine($_POST["id"], "Exercices");
        break;
    case "Theme":
        $_SESSION["message"] = $db->deleteLine($_POST["id"], "Themes");
        break;
    case  "Mot":
        $_SESSION["message"] = $db->deleteLine($_POST["id"], "Mots");
        break;
    case "Item":
        $path = $db->getNomItemFromId($_POST["id"]);
        if (file_exists('..'.$path["nom"])) {
            unlink('..'.$path["nom"]);
        }
        $_SESSION["message"] = $db->deleteLine($_POST["id"], "Items");
        break;
    case "Commentaire":
        $_SESSION["message"] = $db->supprComm($_POST["id"]);
        break;
}
if($_POST["typeSuppr"] == "Mot") {
    header("Location: ../viewLexique.php");
} elseif ($_POST["typeSuppr"] == "Commentaire"){
    header("Location: ../viewRates.php");
} else {
    header("Location: ../index.php");
}