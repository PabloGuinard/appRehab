<?php include '../class/Db.php';
$db = new Db();

$timestamp = $_GET["timestamp"];

//timestamp example -> 1650463200

$newsArray = Array();
$modifiedArray = Array();
$deletedArray = Array();

//add new fields in result
$result = $db->getAllNewCategories(date('Y-m-d H-i-s', $timestamp));
if($result){
    $newsArray["categories"] = $db->setDataInArray($result, ["id", "nomCategorie"]);
} 
$result = $db->getAllNewThemes(date('Y-m-d H-i-s', $timestamp));
if($result){
    $newsArray["themes"] = $db->setDataInArray($result, ["id", "nomTheme", "categorieId"]);
}
$result = $db->getAllNewExercices(date('Y-m-d H-i-s', $timestamp));
if($result){
    $newsArray["exercices"] = $db->setDataInArray($result, ["id", "nomExercice", "themeId"]);
}
$result = $db->getAllNewItems(date('Y-m-d H-i-s', $timestamp));
if($result){$arrayItems = Array();
    $newsArray["items"] = $db->setDataInArray($result, ["id", "pathItem", "typeItem", "exerciceId"]);
}
$result = $db->getAllNewMots(date('Y-m-d H-i-s', $timestamp));
if($result){
    $newsArray["mots"] = $db->setDataInArray($result, ["id", "mot", "definition"]);
}

//add modified fields in result
$result = $db->getAllModifiedCategories(date('Y-m-d H-i-s', $timestamp));
if($result){
    $modifiedArray["categories"] = $db->setDataInArray($result, ["id", "nomCategorie"]);
} 
$result = $db->getAllModifiedThemes(date('Y-m-d H-i-s', $timestamp));
if($result){
    $modifiedArray["themes"] = $db->setDataInArray($result, ["id", "nomTheme", "categorieId"]);
}
$result = $db->getAllModifiedExercices(date('Y-m-d H-i-s', $timestamp));
if($result){
    $modifiedArray["exercices"] = $db->setDataInArray($result, ["id", "nomExercice", "themeId"]);
}
$result = $db->getAllModifiedItems(date('Y-m-d H-i-s', $timestamp));
if($result){$arrayItems = Array();
    $modifiedArray["items"] = $db->setDataInArray($result, ["id", "pathItem", "typeItem", "exerciceId"]);
}
$result = $db->getAllModifiedMots(date('Y-m-d H-i-s', $timestamp));
if($result){
    $modifiedArray["mots"] = $db->setDataInArray($result, ["id", "mot", "definition"]);
}

//add deleted fields in result
$result = $db->getAllDeletedCategories(date('Y-m-d H-i-s', $timestamp));
if($result){
    $deletedArray["categories"] = $db->setDataInArray($result, ["id", "nomCategorie"]);
} 
$result = $db->getAllDeletedThemes(date('Y-m-d H-i-s', $timestamp));
if($result){
    $deletedArray["themes"] = $db->setDataInArray($result, ["id", "nomTheme", "categorieId"]);
}
$result = $db->getAllDeletedExercices(date('Y-m-d H-i-s', $timestamp));
if($result){
    $deletedArray["exercices"] = $db->setDataInArray($result, ["id", "nomExercice", "themeId"]);
}
$result = $db->getAllDeletedItems(date('Y-m-d H-i-s', $timestamp));
if($result){$arrayItems = Array();
    $deletedArray["items"] = $db->setDataInArray($result, ["id", "pathItem", "typeItem", "exerciceId"]);
}
$result = $db->getAllDeletedMots(date('Y-m-d H-i-s', $timestamp));
if($result){
    $deletedArray["mots"] = $db->setDataInArray($result, ["id", "mot", "definition"]);
}



$finalArray = Array();

//delete duplicates in arrayModified
if(isset($modifiedArray["categories"]) && isset($newsArray["categories"])){
    for($cpt = 0; $cpt < sizeof($newsArray["categories"]); $cpt++){
        $index = array_search($newsArray["categories"][$cpt], $modifiedArray["categories"]);
        if(getType($index) != "boolean"){
            unset($modifiedArray["categories"][$index]);
        }
    }
    if(sizeof($modifiedArray["categories"]) < 1)
        unset($modifiedArray["categories"]);
}
if(isset($modifiedArray["themes"]) && isset($newsArray["themes"])){
    for($cpt = 0; $cpt < sizeof($newsArray["themes"]); $cpt++){
        $index = array_search($newsArray["themes"][$cpt], $modifiedArray["themes"]);
        if(getType($index) != "boolean"){
            unset($modifiedArray["themes"][$index]);
        }
    } 
    if(sizeof($modifiedArray["themes"]) < 1)
        unset($modifiedArray["themes"]);
}
if(isset($modifiedArray["exercices"]) && isset($newsArray["exercices"])){
    for($cpt = 0; $cpt < sizeof($newsArray["exercices"]); $cpt++){
        $index = array_search($newsArray["exercices"][$cpt], $modifiedArray["exercices"]);
        if(getType($index) != "boolean"){
            unset($modifiedArray["exercices"][$index]);
        }
    } 
    if(sizeof($modifiedArray["exercices"]) < 1)
        unset($modifiedArray["exercices"]);
}
if(isset($modifiedArray["items"]) && isset($newsArray["items"])){
    for($cpt = 0; $cpt < sizeof($newsArray["items"]); $cpt++){
        $index = array_search($newsArray["items"][$cpt], $modifiedArray["items"]);
        if(getType($index) != "boolean"){
            unset($modifiedArray["items"][$index]);
        }
    } 
    if(sizeof($modifiedArray["items"]) < 1)
        unset($modifiedArray["items"]);
}
if(isset($modifiedArray["mots"]) && isset($newsArray["mots"])){
    for($cpt = 0; $cpt < sizeof($newsArray["mots"]); $cpt++){
        $index = array_search($newsArray["mots"][$cpt], $modifiedArray["mots"]);
        if(getType($index) != "boolean"){
            unset($modifiedArray["mots"][$index]);
        }
    } 
    if(sizeof($modifiedArray["mots"]) < 1)
        unset($modifiedArray["mots"]);
}

//add new, modified and deleted in result if not null
if(sizeof($newsArray) > 0)
    $finalArray["news"] = $newsArray;
if(sizeof($modifiedArray) > 0)
    $finalArray["modified"] = $modifiedArray;
if(sizeof($deletedArray) > 0)
    $finalArray["deleted"] = $deletedArray;

//add presentation in result
$result = $db->getPresentationReadyRecent(date('Y-m-d H-i-s', $timestamp));
if($result){
    $finalArray["presentation"] = $result["contenu"];
}

if(sizeof($finalArray) < 1){
    $finalArray["nothing"] = "nothing";
}

$json = json_encode($finalArray);
echo $json;