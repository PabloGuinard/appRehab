<?php
session_start();
include("../class/Db.php");
$db = new Db();
$db->authenticate();
if($_FILES["challenge"]["size"] < 3145728 AND isset($_FILES['challenge']) AND $_FILES['challenge']['error'] == 0){
    if(file_exists('../database/challenge/challenge.jpg')){
        unlink('../database/challenge/challenge.jpg');
    }
    $_FILES["challenge"]["name"] = 'challenge.jpg';
    move_uploaded_file($_FILES["challenge"]["tmp_name"], "../database/challenge/".basename($_FILES["challenge"]["name"]));
    $db->updateChallenge($_POST["textItem"]);
    $_SESSION["message"] = "Challenge mis à jour";
}
else{
    $_SESSION["message"] = "Image non ajoutée";
}
header("Location: ../index.php");