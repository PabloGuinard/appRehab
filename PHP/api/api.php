<?php include '../class/Db.php';
$db = new Db();

$timestamp = $_GET["timestamp"];

//timestamp example -> 1650463200

$newsArray = Array();
$modifiedArray = Array();

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
$result = $db->getAllCategoriesReadyRecent(date('Y-m-d H-i-s', $timestamp));
if($result){
    $modifiedArray["categories"] = $db->setDataInArray($result, ["id", "nomCategorie"]);
} 
$result = $db->getAllThemesReadyRecent(date('Y-m-d H-i-s', $timestamp));
if($result){
    $modifiedArray["themes"] = $db->setDataInArray($result, ["id", "nomTheme", "categorieId"]);
}
$result = $db->getAllExercicesReadyRecent(date('Y-m-d H-i-s', $timestamp));
if($result){
    $modifiedArray["exercices"] = $db->setDataInArray($result, ["id", "nomExercice", "themeId"]);
}
$result = $db->getAllItemsReadyRecent(date('Y-m-d H-i-s', $timestamp));
if($result){$arrayItems = Array();
    $modifiedArray["items"] = $db->setDataInArray($result, ["id", "pathItem", "typeItem", "exerciceId"]);
}
$result = $db->getAllMotsReadyRecent(date('Y-m-d H-i-s', $timestamp));
if($result){
    $modifiedArray["mots"] = $db->setDataInArray($result, ["id", "mot", "definition"]);
}

$finalArray = Array();

//add new and modified in result if not null
if(sizeof($newsArray) > 0)
    $finalArray["news"] = $newsArray;
if(sizeof($modifiedArray) > 0)
    $finalArray["modified"] = $modifiedArray;

//add presentation in result
$result = $db->getPresentationReadyRecent(date('Y-m-d H-i-s', $timestamp));
if($result){
    $finalArray["presentation"] = $result["contenu"];
}

$json = json_encode($finalArray);
echo $json;