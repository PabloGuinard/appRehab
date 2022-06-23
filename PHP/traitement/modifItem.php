<?php
include "../class/Db.php";
session_start();
$db = new Db();
$db->authenticate();
switch ($_POST["typeFichier"]){
    case "Image":
        $_SESSION["message"] = $_FILES["imageItem"]["name"];
        if($_FILES["imageItem"]["size"] < 3145728 AND isset($_FILES['imageItem']) AND $_FILES['imageItem']['error'] == 0){
            move_uploaded_file($_FILES["imageItem"]["tmp_name"], "../database/images/".basename($_FILES["imageItem"]["name"]));
            $_SESSION["message"] = $db->updateItem("../database/images/".$_FILES["imageItem"]["name"], $_POST["dropAjout"], "Image");
        }
        else{
            $_SESSION["message"] = "Image non ajoutée";
        }
        break;
    case "Video":
        $_SESSION["message"] = $db->updateItem($_POST["videoItem"], $_POST["dropAjout"], "Video");
        break;
    case "Texte":
        $_SESSION["message"] = $db->updateItem($_POST["textItem"], $_POST["dropAjout"], "Texte");
        break;
}
header("Location: ../index.php");