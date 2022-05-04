<?php

class Popup
{
    function modalUpdate(string $color, string $value, string $id, string $traitement, string $text){
        return '
        <div class="modal">
            <div class="modal-content '.$color.'">
                <div class="btClose">x</div>
                <p class="titleModal">'.$text.'</p>
                <form action="/traitement/'.$traitement.'" enctype="multipart/form-data" method="post">
                    <input type="text" name="newName" value="'.$value.'">
                    <input type="hidden" name="id" value="'.$id.'">
                    <button class="'.$color.'" type="submit">Modifier</button>
                </form>
            </div>
        </div>';
    }

    function modalUpdateItem($item){
        $result = '<div class="modal">
                <div class="modal-content red ">
                    <div class="btClose">x</div>
                    <p class="titleModal">Modifier l\'item '.$item["typeItem"].' ?</p>
                    <form action="traitement/modifItem.php" method="post" enctype="multipart/form-data">
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
                            <textarea name="textItem" id="textItem">';
        if($item["typeItem"] == 'Texte') $result .= $item["nom"];
        $result .= '
                                </textarea>
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
                            <button class="red" type="submit">Modifier</button>
                        </form>
                    </div>
                </div>';
        return $result;
    }

    function modalSuppr(string $color, string $text, string $type, string $id){
        return '
        <div class="modal">
            <div class="modal-content '.$color.'">
                <div class="btClose">x</div>
                <p class="titleModal">'.$text.'</p>
                <form action="traitement/suppr.php" enctype="multipart/form-data" method="post">
                    <input type="hidden" name="id" value="'.$id.'">
                    <input type="hidden" name="typeSuppr" value="'.$type.'">
                    <button class="'.$color.'" type="submit">Supprimer</button>
                </form>
            </div>
        </div>';
    }

    function modalAdd(string $color, string $text, string $type, string $typeParent, string $parent){
        return '
        <div class="modal">
            <div class="modal-content '.$color.'">
                <div class="btClose">x</div>
                <p class="titleModal">'.$text.'</p>
                <form action="traitement/ajout'.$type.'.php" enctype="multipart/form-data" method="post">
                    <div class="divInputLabel">
                        <label for="titre'.$type.'">Titre</label>
                        <input type="text" name="titre'.$type.'" class="inputModal">
                    </div>
                    <input type="hidden" name="drop'.$typeParent.'" value="'.$parent.'">
                    <button class="'.$color.'" type="submit">Ajouter</button>
                </form>
            </div>
        </div>';
    }

    function modalAddItem(string $parent){
        return '
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
                                <div class="buttonPreview buttonEdit btModal">Preview</div>
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
            <div class="modal">
                <div class="modal-content red ">
                    <div class="btClose">x</div>
                    <p class="titleModal">Prévisualisation</p>
                    <div class="textPreview"></div>    
                </div>
            </div>';
    }

    function modalAddWord(){
        return '
        <div class="modal">
            <div class="modal-content mainColor">
                <div class="btClose">x</div>
                <p class="titleModal">Ajouter un mot</p>
                <form action="traitement/ajoutMot.php" method="post" enctype="multipart/form-data">
                    <div class="divInputLabel">
                        <label for="titreMot">Mot</label>
                        <input class="inputModal" type="text" name="titreMot" id="titreMot" required="required">
                    </div>
                    <div class="divInputLabel">
                        <label for="dropExercice">Définition</label>
                        <textarea id="textItem" name="textDef"></textarea>
                    </div>
                    <button type="submit">Ajouter Mot</button>
                </form>
            </div>
        </div>';
    }

    function modalUpdateWord($mot){
        return '
        <div class="modal">
            <div class="modal-content mainColor">
                <div class="btClose">x</div>
                <p class="titleModal">Modifier un mot</p>
                <form action="traitement/modifMot.php" method="post" enctype="multipart/form-data">
                    <div class="divInputLabel">
                        <label for="titreMot">Mot</label>
                        <input class="inputModal" type="text" name="titreMot" id="titreMot" required="required" value="'.$mot["nom"].'">
                    </div>
                    <div class="divInputLabel">
                        <label for="dropExercice">Définition</label>
                        <textarea id="textItem" name="textDef">'.$mot["definition"].'</textarea>
                        <input type="hidden" name="id" value="'.$mot["id"].'">
                    </div>
                    <button type="submit">Modifier un mot</button>
                </form>
            </div>
        </div>';
    }
}
