<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>DashBoard | Base de données</title>
    <link href="css/style.css" rel="stylesheet">
</head>

<?php
/* $db = new Db();
echo $db->test(date('Y-m-d H-i-s', 1650536780));
$time = 0;
echo date('Y-m-d H-i-s', $time); */

$item = [
    "typeItem" => "Texte",
    "nom" => "<p15><g>Halloween</g>, c'est la quête des bonbons des enfants dans leur quartier mais c'est aussi la confection de recettes diverses et variées et surtout très <i>créatives</i>. 
    dom, que nous surnommons <#00ff55>EtcheDom </#00ff55>nous livre ici quelques exemples trouvés sur internet.</p15>",
    "id" => 11,
    "parentId" => 11
];

$result = '<div class="modal modalEditText block">
<div class="modal-content red">
    <div class="btClose">x</div>
    <p class="titleModal">Modifier l\'item '.$item["typeItem"].' ?</p>
    <form action="traitement/modifItem.php" method="post" enctype="multipart/form-data" class="formEditText">
        <div id="divRadioAjout">
            <div class="classRadio divRadioTexte">
                <input type="radio" name="typeFichier" id="texteRadio" value="Texte" class="widthNormal noMargin" required="required" checked="checked">
                <label for="texteRadio" class="widthNormal noMargin">Texte</label>
            </div>
            <div class="classRadio divRadioLien">
                <input type="radio" name="typeFichier" id="lienRadio" value="Lien" class="widthNormal noMargin" required="required">
                <label for="lienRadio" class="widthNormal noMargin">Lien</label>
            </div>
            <div class="classRadio divRadioImage">
                <input type="radio" name="typeFichier" id="imageRadio" value="Image" class="widthNormal noMargin" required="required">
                <label for="imageRadio" class="widthNormal noMargin">Image</label>
            </div>
            <div class="classRadio divRadioVideo">
                <input type="radio" name="typeFichier" id="videoRadio" value="Video" class="widthNormal noMargin" required="required">
                <label for="videoRadio" class="widthNormal noMargin">Video</label>
            </div>
        </div>
        <div class="divInputLabel hidden divInputLien">
            <label for="lienItem">Lien</label>
            <input type="text" name="lienItem" id="lienItem" class="inputModal"';
if($item["typeItem"] == 'Lien') $result .= 'value="'.$item["nom"];
$result .= '">
        </div>
        <div class="divInputLabel divInputTexte">
            <label for="textItem">Texte</label>
            <div id="textItem" class="editor" contenteditable="true">
                <p>alo</p></div>

                    <div class="buttonsEditGroup">
                    <div class="buttonBold buttonEdit"><img src="img/bold.png"></div>
                    <div class="buttonUnderline buttonEdit"><img src="img/underline.png"></div>
                    <div class="buttonItalic buttonEdit"><img src="img/italic.png"></div>
                    <select class="buttonFont buttonEdit">
                        <option value="2">13</option>
                        <option value="4" selected="selected">16</option>
                        <option value="5">24</option>
                        <option value="6">32</option>
                    </select>
                    <select class="buttonColor buttonEdit">
                        <option value="black"class="black">Noir</option>
                        <option value="grey"class="grey">Gris</option>
                        <option value="purple"class="purple">Violet</option>
                        <option value="bleu"class="blue">Bleu</option>
                        <option value="green"class="green">Vert</option>
                        <option value="yellow"class="yellow">Jaune</option>
                        <option value="orange"class="orange">Orange</option>
                        <option value="red"class="rouge">Rouge</option>
                        <option value="pink"class="pink">Rose</option>
                    </select>
                </div>
            </div>
            <div class="divInputLabel hidden divInputImage">
                <label for="imageItem">Image</label>
                <input type="file" name="imageItem" class="inputModal" id="imageItem" accept="image/jpeg" src="'.$item["nom"].'">
            </div>
            <div class="divInputLabel hidden divInputVideo">
                <label for="videoItem">ID de la vidéo</label>
                <input type="text" name="videoItem" id="videoItem" class="inputModal"';
if($item["typeItem"] == 'Video') $result .= 'value="'.$item["nom"];
$result .= '">
            </div>
            <input type="hidden" name="dropAjout" value="'.$item["id"].'">
            <button class="red submitEditText" type="submit">Modifier</button>
        </form>
    </div>
</div>
<div class="modal">
    <div class="modal-content red preview">
        <div class="btClose">x</div>
        <p class="titleModal">Prévisualisation</p>
        <div class="textPreview"></div>    
    </div>
</div>';
echo $result;
?>

<script src="/js/editor.js"></script>
<script src="/js/popups.js"></script>
