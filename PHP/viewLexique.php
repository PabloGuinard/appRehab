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
        <a class="link" href="updateApp.php">Mettre à jour l'app</a>
        <a class="link" href="index.php">Retourner au dashboard</a>
        <a class="link" href="viewRates.php">Voir les commentaires</a>
        <a class="link" href="logout.php">Connecté : <?="text"/* phpCAS::getAttributes()["cn"] */?></a>
    </div>
</div>
<p id="erreur"><?php if(isset($_SESSION["message"]))echo $_SESSION["message"];
    unset($_SESSION["message"])?></p>
<div class="buttonAdd btModal">Ajouter un mot</div>
<?php 
echo $popup->modalAddWord();
$allMots = $db->getAllMots();
$motsTitle = array_column($allMots, 'nom');
for ($i=0; $i < sizeof($motsTitle); $i++) { 
    $motsTitle[$i] = strtolower($motsTitle[$i]);
}
array_multisort($motsTitle, SORT_ASC, $allMots);
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
<script src="js/popups.js"></script>
<script src="js/editor.js"></script>
</body>
</html>
