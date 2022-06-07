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
    <title>DashBoard | Commentaires</title>
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
    <div class="h1Button">
        <h1 class="h1DataBase">Commentaires</h1>
        <div class="buttonsDataBase">
            <a class="link" href="updateApp.php">Mettre à jour l'app</a>
            <a class="link" href="index.php">Retourner au dashboard</a>
            <a class="link" href="viewLexique.php">Voir le lexique</a>
            <a class="link" href="logout.php">Connecté : <?=phpCAS::getAttributes()["cn"]?></a>
        </div>
    </div>
    <p id="erreur"><?php if(isset($_SESSION["message"]))echo $_SESSION["message"];
    unset($_SESSION["message"])?></p>
    <?php 
    $allCommentaires = $db->getAllCommentaires();
    $allCommentaires = array_reverse($allCommentaires);
    foreach ($allCommentaires as $commentaire){
        $exercice = $db->getLineFromId($commentaire["exerciceId"], "exercices");
        $theme = $db->getLineFromId($exercice["parentId"], "themes");
        $categorie = $db->getLineFromId($theme["parentId"], "categories");
        echo "
            <div class='divCommentaire'>
                <div class='categorieThemeExercice'>
                    <p class='categorieDataBase'>".$categorie['nom']."</p>
                    <p class='themeDataBase newMargin'>".$theme["nom"]."</p>
                    <p class='exerciceCommentaire'>".$exercice["nom"]."</p>
                </div>
                <div class='commentaire'>
                    <p class='noteCommentaire'>".$commentaire["note"]." / 5</p>
                    <p class='messageCommentaire'>".$commentaire["commentaire"]."</p><br>
                </div>
                <div class='date'>  
                <div class='button btModal'><img src='img/delete_mainColor.png'></div>
                " .$popup->modalSuppr("mainColor", "Supprimer le commentaire ?", "Commentaire", $commentaire["id"])."
                    </form>
                </div>
            </div>";
    }?>
    <script src="js/popups.js"></script>
</body>
</html>
