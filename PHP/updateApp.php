<?php session_start();
if (!$_SESSION["connected"]){
    header('Location: connexion.php');
    die();
}
include 'class/Db.php';
$db = new Db();

$_SESSION["message"] = $db->setIsReadyTrue();

header("Location: index.php");
?>
