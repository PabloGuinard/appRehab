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
        $result = '<div class="modal modalEditText">
                <div class="modal-content red ">
                    <div class="btClose">x</div>
                    <p class="titleModal">Modifier l\'item '.$item["typeItem"].' ?</p>
                    <form action="traitement/modifItem.php" method="post" enctype="multipart/form-data" class="formEditText">
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
            <div id="textItem" class="editor" contenteditable="true">';
                if($item["typeItem"] == 'Texte') $result .=  $item["nom"];
                $result .= '</div>
            </div>
                            <div class="divInputLabel hidden divInputImage">
                                <label for="imageItem">Image</label>
                                <input type="file" name="imageItem" class="inputModal" id="imageItem" accept="image/jpeg"';
        if($item["typeItem"] == 'Image') $result .='src="'.$item["nom"] . '"';
                            $result .= '>   </div>
                            <div class="divInputLabel hidden divInputVideo">
                                <label for="videoItem">URL de la vidéo</label>
                                <input type="text" name="videoItem" id="videoItem" class="inputModal"';
        if($item["typeItem"] == 'Video') $result .= 'value="'.$item["nom"].'"';
                        $result .= '>
                            </div>
                            <input type="hidden" name="dropAjout" value="'.$item["id"].'">
                            <button class="red submitEditText" type="submit">Modifier</button>
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
        <div class="modal">
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
                            <label for="videoItem">URL de la vidéo</label>
                            <input type="text" name="videoItem" id="videoItem" class="inputModal">
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
