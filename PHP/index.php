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
            <a class="link" href="updateApp.php">Mettre à jour l'app</a>
            <a class="link" href="viewLexique.php">Voir le lexique</a>
            <a class="link" href="viewRates.php">Voir les commentaires</a>
            <a class="link" href="logout.php">Connecté : <?= "test"/*phpCAS::getAttributes()["cn"]*/ ?></a>
        </div>
    </div>
    <p id="erreur"><?php if (isset($_SESSION["message"])) echo $_SESSION["message"];
                    unset($_SESSION["message"]) ?></p>
    <div class="divThemeExercice">
        <fieldset class="classThemeExercice">
            <legend>Changer Challenge</legend>
            <form action="traitement/changementChallenge.php" class="formEditText" method="post" enctype="multipart/form-data">
                <div id="divChallenge">
                    <label for="titreExercice">Challenge</label>
                    <input type="file" name="challenge" required="required">
                </div>
                <div class="divInputLabel divInputTexte">
                    <div class="buttonsEditGroup">
                        <div class="buttonBold buttonEdit"><img title="Gras" src="img/bold.png"></div>
                        <div class="buttonUnderline buttonEdit"><img title="Souligné" src="img/underline.png"></div>
                        <div class="buttonItalic buttonEdit"><img title="Italique" src="img/italic.png"></div>
                        <div class="buttonJustifyLeft buttonEdit"><img title="Aligné à gauche" src="img/justify_left.png"></div>
                        <div class="buttonJustifyCenter buttonEdit"><img title="Aligné au centre" src="img/justify_center.png"></div>
                        <div class="buttonJustifyRight buttonEdit"><img title="Aligné à droite" src="img/justify_right.png"></div>
                        <div class="buttonLink buttonEdit"><img title="Lien hypertexte" src="img/link.png"></div>
                        <div class="buttonClean buttonEdit"><img title="Texte simple" src="img/clean.png"></div>
                        <select class="buttonFont buttonEdit">
                            <option value="2">13</option>
                            <option value="4" selected="selected">16</option>
                            <option value="5">24</option>
                            <option value="6">32</option>
                        </select>
                        <select class="buttonColor buttonEdit">
                            <option value="black" class="black">Noir</option>
                            <option value="grey" class="grey">Gris</option>
                            <option value="purple" class="purple">Violet</option>
                            <option value="blue" class="bleu">Bleu</option>
                            <option value="green" class="green">Vert</option>
                            <option value="yellow" class="yellow">Jaune</option>
                            <option value="orange" class="orange">Orange</option>
                            <option value="red" class="rouge">Rouge</option>
                            <option value="pink" class="pink">Rose</option>
                        </select>
                    </div>
                    <input type="hidden" name="textItem" class="inputTextItem">
                    <div id="textItem" class="editor" contenteditable="true"><?= $db->getChallengeText()?></div>
                </div>
                <button type="submit" class="submitEditText">Changer Challenge</button>
            </form>
        </fieldset>
        <fieldset class="classThemeExercice">
            <legend>Qui sommes-nous</legend>
            <form action="traitement/modifPresentation.php" class="formEditText" method="post" enctype="multipart/form-data">
                <label>Contenu</label>
                <div class="divInputLabel divInputTexte">
                    <div class="buttonsEditGroup">
                        <div class="buttonBold buttonEdit"><img title="Gras" src="img/bold.png"></div>
                        <div class="buttonUnderline buttonEdit"><img title="Souligné" src="img/underline.png"></div>
                        <div class="buttonItalic buttonEdit"><img title="Italique" src="img/italic.png"></div>
                        <div class="buttonJustifyLeft buttonEdit"><img title="Aligné à gauche" src="img/justify_left.png"></div>
                        <div class="buttonJustifyCenter buttonEdit"><img title="Aligné au centre" src="img/justify_center.png"></div>
                        <div class="buttonJustifyRight buttonEdit"><img title="Aligné à droite" src="img/justify_right.png"></div>
                        <div class="buttonLink buttonEdit"><img title="Lien hypertexte" src="img/link.png"></div>
                        <div class="buttonClean buttonEdit"><img title="Texte simple" src="img/clean.png"></div>
                        <select class="buttonFont buttonEdit">
                            <option value="2">13</option>
                            <option value="4" selected="selected">16</option>
                            <option value="5">24</option>
                            <option value="6">32</option>
                        </select>
                        <select class="buttonColor buttonEdit">
                            <option value="black" class="black">Noir</option>
                            <option value="grey" class="grey">Gris</option>
                            <option value="purple" class="purple">Violet</option>
                            <option value="blue" class="bleu">Bleu</option>
                            <option value="green" class="green">Vert</option>
                            <option value="yellow" class="yellow">Jaune</option>
                            <option value="orange" class="orange">Orange</option>
                            <option value="red" class="rouge">Rouge</option>
                            <option value="pink" class="pink">Rose</option>
                        </select>
                    </div>
                    <input type="hidden" name="textItem" class="inputTextItem">
                    <div id="textItem" class="editor" contenteditable="true"><?= $db->getPresentation() ?></div>
                </div>
                <button type="submit" class="submitEditText">Mettre à jour</button>
            </form>
        </fieldset>
    </div>
    <div id="buttonResetTreeStructure">
        Fermer la base de données
    </div>
    <div class="dataBase">
        <div class="maxWidth">
        <?php $categories = $db->getCategories();
        $categories1 = [$categories[0], $categories[1], $categories[2]];
        foreach ($categories1 as $category) :
            echo '
                <div class="divDataBase">
                    <div class="divDataBaseButton">
                        <div class="categoryNode">
                            <div class="categorieDataBase">
                                Catégorie ' . $category . '
                            </div>
                        </div>
                    </div>';
            $idCategory = $db->getCategorieId($category);
            $themes = $db->getTableFromParent($idCategory, "themes");
            if (sizeof($themes) > 0) {
                foreach ($themes as $theme) :
                    echo '
                            <div class="hidden themeNode">
                                <div class="themeDataBase brown">
                                    <div class="titleTheme">Thème ' . $theme["nom"] . '</div>
                                    <div class="buttonsForm">
                                        <div class="button btModal"><img src="img/edit_theme.png" alt="Suppr"></div>
                ' . $popup->modalUpdate('brown', $theme["nom"], $theme["id"], 'modifTheme.php', 'Modifier le thème ' . $theme["nom"] . ' ?') . '
                                        <div class="button btModal"><img src="img/delete_theme.png" alt="Modifier"></div>
                ' . $popup->modalSuppr('brown', 'Supprimer le thème ' . $theme["nom"] . ' ?', 'Theme', $theme["id"]) . '
                                    </div>
                            </div>';
                    $exercices = $db->getTableFromParent($theme["id"], "exercices");
                    if (sizeof($exercices) > 0) {
                        foreach ($exercices as $exercice) :
                            echo '
                                <div class="hidden exerciceNode">
                                    <div class="exerciceDataBase blue">
                                        <div class="titleExercice">Article ' . $exercice["nom"] . '</div>
                                        <div class="buttonsForm">
                                        <div class="button btModal"><img src="img/edit_exercice.png" alt="Modifier"></div>
                        ' . $popup->modalUpdate('blue', $exercice["nom"], $exercice["id"], 'modifExercice.php', 'Modifier l\'exercice ' . $exercice["nom"] . ' ?') . '
                                        <div class="button btModal"><img src="img/delete_exercice.png" alt="Suppr"></div>
                        ' . $popup->modalSuppr('blue', 'Supprimer l\'exercice ' . $exercice["nom"] . ' ?', 'Exercice', $exercice["id"]) . '
                                        </div>
                                    </div>';
                            $items = $db->getTableFromParent($exercice["id"], "items");
                            if (sizeof($items) > 0) {
                                foreach ($items as $item) :
                                    echo '
                                    <div class="hidden itemNode red">
                                        <div class="titleItem">Item ' . $item['typeItem'] . '</div>
                                        <div class="buttonsForm">
                                            <div class="button btModal"><img src="img/edit_item.png" alt="Modifier"></div> 
                                            ' . $popup->modalUpdateItem($item) . '
                                            <div class="button btModal"><img src="img/delete_item.png" alt="Suppr"></div> 
                                            ' . $popup->modalSuppr('red', 'Supprimer l\'item ' . $item["typeItem"] . ' ?', 'Item', $item["id"]) . '
                                            
                                        </div>
                                    </div>';
                                endforeach;
                            }
                            echo '<div class="hidden itemNode noBorder"><div class="buttonsForm">
                                        <div class="button btModal"><img src="img/add_item.png" alt="Ajouter"></div>
                                        ' . $popup->modalAddItem($exercice["nom"]) . '
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
                                ' . $popup->modalAdd('blue', 'Ajouter un exercice dans le thème ' . $theme["nom"], 'Exercice', 'Theme', $theme["id"]) . '
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
                            ' . $popup->modalAdd('brown', 'Ajouter un theme dans la catégorie ' . $category, 'Theme', 'Categorie', $category) . '
                        </div>
                    </div>
                </div>
            </div>';
        endforeach;?>
        </div>
        <div class="maxWidth">
        <?php $categories2 = [$categories[3], $categories[4], $categories[5]];
        foreach ($categories2 as $category) :
            echo '
                <div class="divDataBase">
                    <div class="divDataBaseButton">
                        <div class="categoryNode">
                            <div class="categorieDataBase">
                                Catégorie ' . $category . '
                            </div>
                        </div>
                    </div>';
            $idCategory = $db->getCategorieId($category);
            $themes = $db->getTableFromParent($idCategory, "themes");
            if (sizeof($themes) > 0) {
                foreach ($themes as $theme) :
                    echo '
                            <div class="hidden themeNode">
                                <div class="themeDataBase brown">
                                    <div class="titleTheme">Thème ' . $theme["nom"] . '</div>
                                    <div class="buttonsForm">
                                        <div class="button btModal"><img src="img/edit_theme.png" alt="Suppr"></div>
                ' . $popup->modalUpdate('brown', $theme["nom"], $theme["id"], 'modifTheme.php', 'Modifier le thème ' . $theme["nom"] . ' ?') . '
                                        <div class="button btModal"><img src="img/delete_theme.png" alt="Modifier"></div>
                ' . $popup->modalSuppr('brown', 'Supprimer le thème ' . $theme["nom"] . ' ?', 'Theme', $theme["id"]) . '
                                    </div>
                            </div>';
                    $exercices = $db->getTableFromParent($theme["id"], "exercices");
                    if (sizeof($exercices) > 0) {
                        foreach ($exercices as $exercice) :
                            echo '
                                <div class="hidden exerciceNode">
                                    <div class="exerciceDataBase blue">
                                        <div class="titleExercice">Article ' . $exercice["nom"] . '</div>
                                        <div class="buttonsForm">
                                        <div class="button btModal"><img src="img/edit_exercice.png" alt="Modifier"></div>
                        ' . $popup->modalUpdate('blue', $exercice["nom"], $exercice["id"], 'modifExercice.php', 'Modifier l\'exercice ' . $exercice["nom"] . ' ?') . '
                                        <div class="button btModal"><img src="img/delete_exercice.png" alt="Suppr"></div>
                        ' . $popup->modalSuppr('blue', 'Supprimer l\'exercice ' . $exercice["nom"] . ' ?', 'Exercice', $exercice["id"]) . '
                                        </div>
                                    </div>';
                            $items = $db->getTableFromParent($exercice["id"], "items");
                            if (sizeof($items) > 0) {
                                foreach ($items as $item) :
                                    echo '
                                    <div class="hidden itemNode red">
                                        <div class="titleItem">Item ' . $item['typeItem'] . '</div>
                                        <div class="buttonsForm">
                                            <div class="button btModal"><img src="img/edit_item.png" alt="Modifier"></div> 
                                            ' . $popup->modalUpdateItem($item) . '
                                            <div class="button btModal"><img src="img/delete_item.png" alt="Suppr"></div> 
                                            ' . $popup->modalSuppr('red', 'Supprimer l\'item ' . $item["typeItem"] . ' ?', 'Item', $item["id"]) . '
                                            
                                        </div>
                                    </div>';
                                endforeach;
                            }
                            echo '<div class="hidden itemNode noBorder"><div class="buttonsForm">
                                        <div class="button btModal"><img src="img/add_item.png" alt="Ajouter"></div>
                                        ' . $popup->modalAddItem($exercice["nom"]) . '
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
                                ' . $popup->modalAdd('blue', 'Ajouter un exercice dans le thème ' . $theme["nom"], 'Exercice', 'Theme', $theme["id"]) . '
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
                            ' . $popup->modalAdd('brown', 'Ajouter un theme dans la catégorie ' . $category, 'Theme', 'Categorie', $category) . '
                        </div>
                    </div>
                </div>
            </div>';
        endforeach; ?>
        </div>
    </div>
    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="js/popups.js"></script>
    <script src="js/treeStructure.js"></script>
    <script src="js/editor.js"></script>
</body>

</html>