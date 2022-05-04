<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>DashBoard | Base de données</title>
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
<div class="modal block">
        <div class="modal-content red ">
            <div class="btClose">x</div>
            <p class="titleModal">Ajouter un item dans l\'exercice '.$parent.' ?</p>
            <form action="traitement/ajoutItem.php" method="post" enctype="multipart/form-data">
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
                    <input type="text" name="lienItem" id="lienItem" class="inputModal">
                </div>
                <div class="divInputLabel hidden divInputVideo">
                    <label for="videoItem">ID de la vidéo</label>
                    <input type="text" name="videoItem" id="videoItem" class="inputModal">
                </div>
                <div class="divInputLabel divInputTexte">
                    <label for="textItem">Texte</label>
                    <textarea name="textItem" id="textItem" class="textItem">texte</textarea>
                    <div class="buttonsEditGroup">
                        <div class="buttonBold buttonEdit">Gras</div>
                        <div class="buttonUnderline buttonEdit">Souligné</div>
                        <div class="buttonItalic buttonEdit">Italique</div>
                        <div>
                            <div class="buttonFont buttonEdit">Police</div>
                            <input type="number" name="fontSize" class="fontSize" min="10" max = "99" value="20"/>
                        </div>
                        <div>
                            <div class="buttonColor buttonEdit red">Couleur</div>
                            <input type="color" name="textColor" class="textColor" value="#000000"/>
                        </div>
                    </div>
                </div>
                <div class="divInputLabel hidden divInputImage">
                    <label for="imageItem">Image</label>
                    <input type="file" name="imageItem" class="inputModal" id="imageItem" accept="image/jpeg">
                </div>
                <input type="hidden" name="dropAjout" value="'.$parent.'">
                <button class="red" type="submit">Ajouter</button>
            </form>
        </div>
    </div>
    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="js/script.js"></script>
</body>