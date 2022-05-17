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
$parent = "text";

$result = '<div class="modal block">
<div class="modal-content red ">
    <div class="btClose">x</div>
    <p class="titleModal">Ajouter un item dans l\'exercice '.$parent.' ?</p>
    <form action="traitement/ajoutItem.php" method="post" enctype="multipart/form-data" class="formEditText">
        <div id="divRadioAjout">
            <div class="classRadio divRadioTexte">
                <input type="radio" name="typeFichier" id="texteRadio" value="Texte" class="widthNormal noMargin" required="required" checked="checked">
                <label for="texteRadio" class="widthNormal noMargin">Texte</label>
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
        <div class="divInputLabel hidden divInputVideo">
            <label for="videoItem">ID de la vidéo</label>
            <input type="text" name="videoItem" id="videoItem" class="inputModal">
        </div>
        <div class="divInputLabel divInputTexte">
        
        <div class="buttonsEditGroup">
            <div class="buttonBold buttonEdit"><img src="img/bold.png"></div>
            <div class="buttonUnderline buttonEdit"><img src="img/underline.png"></div>
            <div class="buttonItalic buttonEdit"><img src="img/italic.png"></div>
            <div class="buttonJustifyLeft buttonEdit"><img src="img/justify_left.png"></div>
            <div class="buttonJustifyCenter buttonEdit"><img src="img/justify_center.png"></div>
            <div class="buttonJustifyRight buttonEdit"><img src="img/justify_right.png"></div>
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
                <option value="blue"class="bleu">Bleu</option>
                <option value="green"class="green">Vert</option>
                <option value="yellow"class="yellow">Jaune</option>
                <option value="orange"class="orange">Orange</option>
                <option value="red"class="rouge">Rouge</option>
                <option value="pink"class="pink">Rose</option>
            </select>
        </div>
        <input type="hidden" name="textItem" class="inputTextItem">
        <div id="textItem" class="editor" contenteditable="true">
        </div>
        </div>
        <div class="divInputLabel hidden divInputImage">
            <label for="imageItem">Image</label>
            <input type="file" name="imageItem" class="inputModal" id="imageItem" accept="image/jpeg">
        </div>
        <input type="hidden" name="dropAjout" value="'.$parent.'">
        <button class="red submitEditText" type="submit">Ajouter</button>
    </form>
</div>
</div>';
echo $result;
?>

<script src="/js/editor.js"></script>
<script src="/js/popups.js"></script>
