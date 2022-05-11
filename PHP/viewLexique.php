<?php session_start();
include "class/Db.php";
include "class/Popup.php";
$db = new Db();
$popup = new Popup();
$db->authenticate();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>DashBoard | Lexique</title>
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
<div class="h1Button">
    <h1 class="h1DataBase">Lexique</h1>
    <div class="buttonsDataBase">
        <a href="updateApp.php">Mettre à jour l'app</a>
        <a href="index.php">Retourner au dashboard</a>
        <a href="viewRates.php">Voir les commentaires</a>
        <a href="logout.php">Connecté : <?=phpCAS::getAttributes()["cn"]?></a>
    </div>
</div>
<p id="erreur"><?php if(isset($_SESSION["message"]))echo $_SESSION["message"];
    unset($_SESSION["message"])?></p>
<div class="buttonAdd btModal">Ajouter un mot</div>
<?php 
echo $popup->modalAddWord();
$allMots = $db->getAllMots();
foreach ($allMots as $mot){
    echo "
        <div class='divCommentaire mainColor'>
            <p class='mot'>".$mot['nom']."</p>
            <p class='messageCommentaire'>".$mot["definition"]. "</p>
            <div class='buttonsForm'>
                <div class='button btModal'><img src='img/edit_mainColor.png'></div>
                " .$popup->modalUpdateWord($mot). "
                <div class='button btModal'><img src='img/delete_mainColor.png'></div>
                " .$popup->modalSuppr("mainColor", "Supprimer le mot " . $mot['nom'] . " ?", "Mot", $mot["id"])."
            </div>
        </div>";
}?>
<script src="js/script.js"></script>
</body>
</html>
