<?php session_start();
include "class/Db.php";
$db = new Db();
$db->authenticate();
include "class/Popup.php";
$popup = new Popup();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>DashBoard | Base de données</title>
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
<div class="h1Button">
    <h1 class="h1DataBase">Dashboard</h1>
    <div class="buttonsDataBase">
        <a href="updateApp.php">Mettre à jour l'app</a>
        <a href="viewLexique.php">Voir le lexique</a>
        <a href="viewRates.php">Voir les commentaires</a>
        <a href="logout.php">Connecté : <?=phpCAS::getAttributes()["cn"]?></a>
    </div>
</div>
<p id="erreur"><?php if(isset($_SESSION["message"]))echo $_SESSION["message"];
                    unset($_SESSION["message"])?></p>
<div class="divThemeExercice">
    <fieldset class="classThemeExercice">
        <legend>Changer Challenge</legend>
        <form action="traitement/changementChallenge.php" method="post" enctype="multipart/form-data">
            <label for="titreExercice">Challenge</label>
            <input type="file" name="challenge" required="required">
            <button type="submit">Changer Challenge</button>
        </form>
    </fieldset>
    <fieldset class="classThemeExercice">
        <legend>Qui sommes-nous</legend>
        <form action="traitement/modifPresentation.php" method="post" enctype="multipart/form-data">
            <textarea class="textAreaInput" name="newText"><?= $db->getPresentation()?></textarea>
            <button type="submit">Mettre à jour</button>
        </form>
    </fieldset>
</div>
<div class="dataBase">
    <?php $categories = $db->getCategories();
    foreach ($categories as $category):
        echo '
                <div class="divDataBase">
                    <div class="divDataBaseButton">
                        <div class="categoryNode">
                            <div class="categorieDataBase">
                                Catégorie '.$category. '
                            </div>
                        </div>
                    </div>';
        $idCategory = $db->getCategorieId($category);
        $themes = $db->getTableFromParent($idCategory, "Themes");
        if(sizeof($themes) > 0) {
            foreach ($themes as $theme):
                echo '
                            <div class="hidden themeNode">
                                <div class="themeDataBase brown">
                                    <div class="titleTheme">Thème ' . $theme["nom"] . '</div>
                                    <div class="buttonsForm">
                                        <div class="button btModal"><img src="img/edit_theme.png" alt="Suppr"></div>
                ' .$popup->modalUpdate('brown', $theme["nom"], $theme["id"], 'modifTheme.php', 'Modifier le thème '.$theme["nom"].' ?'). '
                                        <div class="button btModal"><img src="img/delete_theme.png" alt="Modifier"></div>
                ' .$popup->modalSuppr('brown', 'Supprimer le thème '.$theme["nom"].' ?', 'Theme', $theme["id"]).'
                                    </div>
                            </div>';
                $exercices = $db->getTableFromParent($theme["id"], "Exercices");
                if(sizeof($exercices) > 0){
                    foreach ($exercices as $exercice):
                        echo '
                                <div class="hidden exerciceNode">
                                    <div class="exerciceDataBase blue">
                                        <div class="titleExercice">Exercice ' . $exercice["nom"] . '</div>
                                        <div class="buttonsForm">
                                        <div class="button btModal"><img src="img/edit_exercice.png" alt="Modifier"></div>
                        ' .$popup->modalUpdate('blue', $exercice["nom"], $exercice["id"], 'modifExercice.php', 'Modifier l\'exercice '.$exercice["nom"].' ?'). '
                                        <div class="button btModal"><img src="img/delete_exercice.png" alt="Suppr"></div>
                        ' .$popup->modalSuppr('blue', 'Supprimer l\'exercice '.$exercice["nom"].' ?', 'Exercice', $exercice["id"]).'
                                        </div>
                                    </div>';
                        $items = $db->getTableFromParent($exercice["id"], "Items");
                        if(sizeof($items) > 0){
                            foreach ($items as $item):
                                echo '
                                    <div class="hidden itemNode red">
                                        <div class="titleItem">Item ' . $item['typeItem'] . '</div>
                                        <div class="buttonsForm">
                                            <div class="button btModal"><img src="img/edit_item.png" alt="Modifier"></div> 
                                            ' .$popup->modalUpdateItem($item). '
                                            <div class="button btModal"><img src="img/delete_item.png" alt="Suppr"></div> 
                                            ' .$popup->modalSuppr('red', 'Supprimer l\'item '.$item["typeItem"].' ?', 'Item', $item["id"]).'
                                            
                                        </div>
                                    </div>';
                            endforeach;
                        }
                            echo '<div class="hidden itemNode noBorder"><div class="buttonsForm">
                                        <div class="button btModal"><img src="img/add_item.png" alt="Ajouter"></div>
                                        ' .$popup->modalAddItem($exercice["nom"]).'
                                        </div>
                                    </div>
                                </div>';
                    endforeach;
                }
                echo '
                    <div class="hidden exerciceNode">
                        <div class="exerciceDataBase noBorder">
                            <div class="buttonsForm">
                                <div class="button btModal"><img src="img/add_exercice.png" alt="Ajouter"></div>
                                ' .$popup->modalAdd('blue', 'Ajouter un exercice dans le thème ' .$theme["nom"], 'Exercice', 'Theme', $theme["nom"]).'
                            </div>
                        </div>
                    </div>
                </div>';
            endforeach;
        }
        echo '<div class="hidden themeNode">
                <div class="themeDataBase noBorder">
                    <div class="buttonsForm">
                        <div class="button btModal"><img src="img/add_theme.png" alt="Ajouter"></div>
                            ' .$popup->modalAdd('brown', 'Ajouter un theme dans la catégorie '.$category, 'Theme', 'Categorie', $category).'
                        </div>
                    </div>
                </div>
            </div>';
    endforeach;?>

</div>
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="js/popups.js"></script>
<script src="js/treeStructure.js"></script>
</body>
</html>
