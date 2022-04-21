<?php include '../class/Db.php';
$db = new Db();

$timestamp = $_GET["timestamp"];

//timestamp example -> 1650463200

$finalArray = Array();

//add new categories in result
/* $categories = $db->getAllCategoriesReadyRecent(date('Y-m-d H-i-s', $timestamp));
if($categories){
    $arrayCategories = Array();
    $arrayTmp = Array();
    $cpt = 0;
    
    foreach ($categories as $categorie){
        $arrayCategorie = Array(
            "idCategorie" => $categorie["idCategorie"],
            "nomCategorie" => $categorie["nomCategorie"]
        );
        $arrayCategories[$cpt] = $arrayCategorie;
        $cpt++;
    }
    $finalArray["categories"] = $arrayCategories;
} else {
    echo "No new categories\n";
} */

//add new themes in result
$themes = $db->getAllThemesReadyRecent(date('Y-m-d H-i-s', $timestamp));
if($themes){
    $arrayThemes = Array();
    $arrayTmp = Array();
    $cpt = 0;
    
    foreach ($themes as $theme) {
        $arrayTheme = Array(
            "idTheme" => $theme["idTheme"],
            "nomTheme" => $theme["nomTheme"],
            "categorieId" => $theme["categorieId"]
        );
        $arrayThemes[$cpt] = $arrayTheme;
        $cpt++;
    }
    $finalArray["themes"] = $arrayThemes;
} else {
    echo "no new themes\n";
}


//add new exercices in result
$exercices = $db->getAllExercicesReadyRecent(date('Y-m-d H-i-s', $timestamp));
if($exercices){
    $arrayExercices = Array();
    $arrayTmp = Array();
    $cpt = 0;
    
    foreach ($exercices as $exercice) {
        $arrayExercice = Array(
            "idExercice" => $exercice["idExercice"],
            "nomExercice" => $exercice["nomExercice"],
            "themeId" => $exercice["themeId"]
        );
        $arrayExercices[$cpt] = $arrayExercice;
        $cpt++;
    }
    $finalArray["exercices"] = $arrayExercices;
} else {
    echo "no new exercices\n";
}

//add new items in result
$items = $db->getAllItemsReadyRecent(date('Y-m-d H-i-s', $timestamp));
if($items){$arrayItems = Array();
    $arrayTmp = Array();
    $cpt = 0;
    
    foreach ($items as $item) {
        $arrayItem = Array(
            "idItem" => $item["idItem"],
            "pathItem" => $item["pathItem"],
            "typeItem" => $item["typeItem"],
            "exerciceId" => $item["exerciceId"]
        );
        $arrayItems[$cpt] = $arrayItem;
        $cpt++;
    }
    $finalArray["items"] = $arrayItems;
} else {
    echo "no new items\n";
}

//add new mots in result
$mots = $db->getAllMotsReadyRecent(date('Y-m-d H-i-s', $timestamp));
if($mots){
    $arrayMots = Array();
    $arrayTmp = Array();
    $cpt = 0;
    
    foreach ($mots as $mot) {
        $arrayMot = Array(
            "idMot" => $mot["idMot"],
            "mot" => $mot["mot"],
            "definition" => $mot["definition"]
        );
        $arrayMots[$cpt] = $arrayMot;
        $cpt++;
    }
    $finalArray["mots"] = $arrayMots;
} else {
    echo "no new mots\n";
}

//add presentation in result
$presentation = $db->getPresentationReadyRecent(date('Y-m-d H-i-s', $timestamp));
if($presentation){
    $finalArray["presentation"] = $presentation["contenu"];
} else {
    echo "no new presentation\n";
}

$json = json_encode($finalArray);
echo $json;