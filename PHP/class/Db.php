<?php
class Db {
    public $pdo;
    function __construct(){
        try{
            try{
                $this->pdo = new PDO('mysql:host=127.0.0.1;dbname=id18263011_databaselarehab; charset=utf8', 'root');
                //$this->pdo = new PDO('mysql:host=localhost;dbname=id18263011_databaselarehab', 'id18263011_admin', 'M(#hqygJ2DXj^bN4');
                //$this->pdo = new PDO('sqlite:'.__DIR__.'\..\database\database.db' );
            } catch(PDOException $e){
                echo "Connexion échouée : " . $e->getMessage();
            }
        }catch(PDOException $e){
            echo $e->getMessage();
        }
        date_default_timezone_set('Europe/Paris');
    }

    public function addTheme(string $nom, string $categorie){
        $sth = $this->pdo->prepare("SELECT * FROM Categories WHERE nomCategorie= :categorie");
        $sth->execute(["categorie" => $categorie]);
        $result = $sth->fetch();
        if($result == false){
            return "Catégorie inexistante";
        }
        $categorieId = $result["id"];
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE nomTheme= :lesson");
        $sth->execute(["lesson" => $nom]);
        $result = $sth->fetch();
        if($result != false){
            return "Thème déjà existant";
        }
        $sth = $this->pdo->prepare("INSERT INTO Themes (nomTheme, categorieId) VALUES (:nom, :categorie)");
        $sth->execute(["nom" => $nom, "categorie" => $categorieId]);
        return "Thème ajouté";
    }

    public function addExercice(string $nom, string $lesson){
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE nomTheme= :lesson");
        $sth->execute(["lesson" => $lesson]);
        $result = $sth->fetch();
        if($result == false){
            return "Thème non existant";
        }
        $lessonId = $result["id"];
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE nomExercice= :nom");
        $sth->execute(["nom" => $nom]);
        $result = $sth->fetch();
        if($result != false){
            return "Exercice déjà existant";
        }
        $sth = $this->pdo->prepare("INSERT INTO Exercices(nomExercice, themeId) VALUES(:nom, :lessonId)");
        $sth->execute(["nom" => $nom, "lessonId" => $lessonId]);
        return "Exercice ajouté";
    }

    public function addItem(string $contenu, string $exercice, string $typeFile){
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE nomExercice= :exercice");
        $sth->execute(["exercice" => $exercice]);
        $result = $sth->fetch();
        if($result == false){
            return "Exercice non existant";
        }
        $itemId = $result["id"];
        $sth = $this->pdo->prepare("SELECT * FROM Items WHERE pathItem= :nom");
        $sth->execute(["nom" => $contenu]);
        $result = $sth->fetch();
        if($result != false){
            return "Item déjà existant";
        }
        $sth = $this->pdo->prepare("INSERT INTO Items(pathItem, typeItem, ExerciceId) VALUES(:contenu, :typeFile, :exercice)");
        $sth->execute(["exercice" => $itemId, "contenu" => $contenu, "typeFile" => $typeFile]);
        return "Item ajouté";
    }

    public function addMot(string $mot, string $def){
        $sth = $this->pdo->prepare("SELECT * FROM Mots WHERE mot= :mot");
        $sth->execute(["mot" => $mot]);
        $result = $sth->fetch();
        if($result != false){
            return "Mot déjà existant";
        }
        $sth = $this->pdo->prepare("INSERT INTO Mots(mot, definition) VALUES(:mot, :def)");
        $sth->execute(["mot" => $mot, "def" => $def]);
        return "Mot ajouté";
    }

    public function deleteMot(string $nom){
        $sth = $this->pdo->prepare("SELECT * FROM Mots WHERE mot= :mot");
        $sth->execute(["mot" => $nom]);
        $result = $sth->fetch();
        if($result == false){
            return "Mot non existant";
        }
        $timestamp = date('Y-m-d H-i-s');
        $sth = $this->pdo->prepare("UPDATE Mots SET isReady = -1, modifiedAt= :timestamp WHERE mot= :mot");
        $sth->execute(["mot" => $nom, "timestamp" => $timestamp]);
        return "Mot supprimé";
    }

    public function deleteExercice(string $nom){
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE nomExercice= :nom");
        $sth->execute(["nom" => $nom]);
        $result = $sth->fetch();
        if ($result == false) {
            return "Exercice non existant";
        }
        $timestamp = date('Y-m-d H-i-s');
        $itemId = $result["id"];
        $sth = $this->pdo->prepare("UPDATE Items SET isReady = -1 WHERE ExerciceId= :itemId");
        $sth->execute(["itemId" => $itemId]);
        $sth = $this->pdo->prepare("UPDATE Exercices SET isReady = -1, modifiedAt= :timestamp WHERE id= :itemId");
        $sth->execute(["itemId" => $itemId, "timestamp" => $timestamp]);
        return "Exercice supprimé";
    }

    public function deleteItem(string $id){
        $sth = $this->pdo->prepare("SELECT * FROM Items WHERE id= :id");
        $sth->execute(["id" => $id]);
        $result = $sth->fetch();
        if($result == false){
            return "Item non existant";
        }
        $timestamp = date('Y-m-d H-i-s');
        $sth = $this->pdo->prepare("UPDATE Items SET isReady = -1, modifiedAt= :timestamp WHERE id= :id");
        $sth->execute(["id" => $id, "timestamp" => $timestamp]);
        return "Item supprimé";
    }

    public function deleteTheme(string $nom){
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE nomTheme= :nom");
        $sth->execute(["nom" => $nom]);
        $result = $sth->fetch();
        if($result == false){
            return "Thème non existant";
        }
        $lessonId = $result["id"];
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE themeId= :lessonId");
        $sth->execute(["lessonId" => $lessonId]);
        $result = $sth->fetchAll(PDO::FETCH_COLUMN, 1);
        foreach ($result as $value){
            $this->deleteExercice($value);
        }
        $timestamp = date('Y-m-d H-i-s');
        $sth = $this->pdo->prepare("UPDATE Themes SET isReady = -1, modifiedAt= :timestamp WHERE id= :lessonId");
        $sth->execute(["lessonId" => $lessonId, "timestamp" => $timestamp]);
        return "Thème supprimé";
    }

    public function deleteCategorie(string $nom){
        $sth = $this->pdo->prepare("SELECT * FROM Categories WHERE nomCategorie= :nom");
        $sth->execute(["nom" => $nom]);
        $result = $sth->fetch();
        if($result == false){
            return "Catégorie non existante";
        }
        $categoryId = $result["id"];
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE categorieId= :categoryId");
        $sth->execute(["categoryId" => $categoryId]);
        $result = $sth->fetchAll(PDO::FETCH_COLUMN, 1);
        foreach ($result as $value){
            $this->deleteTheme($value);
        }
        $timestamp = date('Y-m-d H-i-s');
        $sth = $this->pdo->prepare("UPDATE Categories SET isReady = -1, modifiedAt= :timestamp WHERE id= :categoryId");
        $sth->execute(["categoryId" => $categoryId, "timestamp" => $timestamp]);
        return "Catégorie supprimée";
    }

    public function getCategories(){
        $sth = $this->pdo->prepare("SELECT * FROM Categories WHERE isReady != -1");
        $sth->execute();
        $result = $sth->fetchAll(PDO::FETCH_COLUMN, 1);
        return $result;
    }

    public function getThemes(){
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE isReady != -1");
        $sth->execute();
        $result = $sth->fetchAll(PDO::FETCH_COLUMN, 1);
        return $result;
    }

    public function getExercices(){
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE isReady != -1");
        $sth->execute();
        $result = $sth->fetchAll(PDO::FETCH_COLUMN, 1);
        return $result;
    }

    public function getMots(){
        $sth = $this->pdo->prepare("SELECT * FROM Mots WHERE isReady != -1");
        $sth->execute();
        $result = $sth->fetchAll(PDO::FETCH_COLUMN, 1);
        return $result;
    }

    public function getCategorieId(string $nom){
        $sth = $this->pdo->prepare("SELECT * FROM Categories WHERE nomCategorie= :nom");
        $sth->execute(["nom" => $nom]);
        return $sth->fetch(PDO::FETCH_COLUMN, 0);
    }

    public function getThemeId(string $nom){
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE nomTheme= :nom");
        $sth->execute(["nom" => $nom]);
        return $sth->fetch(PDO::FETCH_COLUMN, 0);
    }

    public function getExerciceId(string $nom){
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE nomExercice= :nom");
        $sth->execute(["nom" => $nom]);
        return $sth->fetch(PDO::FETCH_COLUMN, 0);
    }

    public function getThemesFromCategorie(string $idCategory){
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE categorieId= :idCategory AND isReady != -1");
        $sth->execute(["idCategory" => $idCategory]);
        return $sth->fetchAll(PDO::FETCH_COLUMN, 1);
    }

    public function getExerciceFromTheme(string $idLesson){
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE themeId= :idLesson AND isReady != -1");
        $sth->execute(["idLesson" => $idLesson]);
        return $sth->fetchAll(PDO::FETCH_COLUMN, 1);
    }

    public function getItemsFromExercice(string $idExercice){
        $sth = $this->pdo->prepare("SELECT * FROM Items WHERE exerciceId= :id AND isReady != -1");
        $sth->execute(["id" => $idExercice]);
        return $sth->fetchAll();
    }

    public function getAllCommentaires(){
        $sth = $this->pdo->prepare("SELECT * FROM Commentaires WHERE isReady != -1");
        $sth->execute();
        return $sth->fetchAll();
    }

    public function getExerciceFromExerciceId(string $id){
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE id= :id");
        $sth->execute(["id" => $id]);
        return $sth->fetch();
    }

    public function getThemeFromThemeId(string $id){
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE id= :id");
        $sth->execute(["id" => $id]);
        return $sth->fetch();
    }

    public function getCategorieFromCategorieId(string $id){
        $sth = $this->pdo->prepare("SELECT * FROM Categories WHERE id= :id");
        $sth->execute(["id" => $id]);
        return $sth->fetch();
    }

    public function getAllMots(){
        $sth = $this->pdo->prepare("SELECT * FROM Mots WHERE isReady != -1");
        $sth->execute();
        return $sth->fetchAll();
    }

    public function getAllNewMots($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Mots WHERE isReady=1 AND TIMESTAMP(:myTime) < createdAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getAllNewCategories($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Categories WHERE isReady=1 AND TIMESTAMP(:myTime) < createdAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getAllNewThemes($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE isReady=1 AND TIMESTAMP(:myTime) < createdAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getAllNewExercices($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE isReady=1 AND TIMESTAMP(:myTime) < createdAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getAllNewItems($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Items WHERE isReady=1 AND TIMESTAMP(:myTime) < createdAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getAllModifiedMots($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Mots WHERE isReady=1 AND TIMESTAMP(:myTime) < modifiedAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getAllModifiedCategories($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Categories WHERE isReady=1 AND TIMESTAMP(:myTime) < modifiedAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    } 

    public function getAllModifiedThemes($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE isReady=1 AND TIMESTAMP(:myTime) < modifiedAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getAllModifiedExercices($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE isReady=1 AND TIMESTAMP(:myTime) < modifiedAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getAllModifiedItems($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Items WHERE isReady=1 AND TIMESTAMP(:myTime) < modifiedAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getAllDeletedMots($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Mots WHERE isReady=-1 AND TIMESTAMP(:myTime) < modifiedAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getAllDeletedCategories($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Categories WHERE isReady=-1 AND TIMESTAMP(:myTime) < modifiedAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getAllDeletedThemes($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE isReady=-1 AND TIMESTAMP(:myTime) < modifiedAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getAllDeletedExercices($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE isReady=-1 AND TIMESTAMP(:myTime) < modifiedAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getAllDeletedItems($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Items WHERE isReady=-1 AND TIMESTAMP(:myTime) < modifiedAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getPresentationReadyRecent($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Presentation WHERE isReady=1 AND TIMESTAMP(:myTime) < modifiedAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetch();
    }

    public function addComment(string $rate, string $comment, string $exerciceId){
          $sth = $this->pdo->prepare("INSERT INTO Commentaires (note, commentaire, exerciceId) VALUES (:note, :comment, :exerciceId)");
          $sth->execute(["note" => $rate, "comment" => $comment, "exerciceId" => $exerciceId]);
          $sth->fetch();
    }

    public function updateTheme(string $newTitle, string $theme){
        $timestamp = date('Y-m-d H-i-s');
        $sth = $this->pdo->prepare("UPDATE Themes SET nomTheme= :newTitle, isReady=0, modifiedAt= :timestamp WHERE nomTheme= :theme");
        $sth->execute(["newTitle" => $newTitle, "theme" => $theme, "timestamp" => $timestamp]);
        return "Thème mis à jour";
    }

    public function updateExercice(string $newTitle, string $exercice){
        $timestamp = date('Y-m-d H-i-s');
        $sth = $this->pdo->prepare("UPDATE Exercices SET nomExercice= :newTitle, isReady=0, modifiedAt= :timestamp WHERE nomExercice= :exercice");
        $sth->execute(["newTitle" => $newTitle, "exercice" => $exercice, "timestamp" => $timestamp]);
        return "Exercice mis à jour";
    }

    public function updateItem(string  $pathItem, string $id, string $typeItem){
        $timestamp = date('Y-m-d H-i-s');
        $sth = $this->pdo->prepare("UPDATE Items SET typeItem= :typeItem, pathItem= :pathItem, isReady=0, modifiedAt= :timestamp WHERE id= :id");
        $sth->execute(["typeItem" => $typeItem, "pathItem" => $pathItem, "id" => $id, "timestamp" => $timestamp]);
        return "Item mis à jour";
    }

    public function updatePresentation(string $contenu){
        $timestamp = date('Y-m-d H-i-s');
        $sth = $this->pdo->prepare("UPDATE Presentation SET contenu= :contenu, isReady=0, modifiedAt= :timestamp");
        $sth->execute(["contenu" => $contenu, "timestamp" => $timestamp]);
        echo $sth->fetch();
        return "Présentation mise à jour";
    }

    public function updateMot(string $mot, string $definition, string $oldMot){
        $timestamp = date('Y-m-d H-i-s');
        $sth = $this->pdo->prepare("UPDATE Mots SET mot= :mot, definition= :definition, isReady=0, modifiedAt= :timestamp WHERE mot= :oldMot");
        $sth->execute(["mot" => $mot, "definition" => $definition, "oldMot" => $oldMot, "timestamp" => $timestamp]);
        return "Mot modifié";
    }

    public function getPresentation(){
        $sth = $this->pdo->prepare("SELECT * FROM Presentation");
        $sth->execute();
        $result = $sth->fetch();
        return $result["contenu"];
    }

    public function supprComm(string $id){
        $sth = $this->pdo->prepare("UPDATE Commentaires SET isReady = -1 WHERE id= :id");
        $sth->execute(["id" => $id]);
        return "Commentaire supprimé";
    }

    public function getPathItemFromId(string $id){
        $sth = $this->pdo->prepare("SELECT pathItem FROM Items WHERE id= :id");
        $sth->execute(["id" => $id]);
        return $sth->fetch();
    }

    public function setIsReadyTrue(){
        $sth = $this->pdo->prepare("UPDATE Categories SET isReady= 1 WHERE isReady = 0");
        $sth->execute();
        $sth = $this->pdo->prepare("UPDATE Themes SET isReady= 1 WHERE isReady = 0");
        $sth->execute();
        $sth = $this->pdo->prepare("UPDATE Exercices SET isReady= 1 WHERE isReady = 0");
        $sth->execute();
        $sth = $this->pdo->prepare("UPDATE Items SET isReady= 1 WHERE isReady = 0");
        $sth->execute();
        $sth = $this->pdo->prepare("UPDATE Mots SET isReady= 1 WHERE isReady = 0");
        $sth->execute();
        $sth = $this->pdo->prepare("UPDATE Presentation SET isReady= 1 WHERE isReady = 0");
        $sth->execute();
        return "App mise à jour";
    }

    public function test($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM categories  WHERE TIMESTAMP(:mytime) < modifiedAt ");
        $sth->execute(["mytime" => $timestamp]);
        $result = $sth->fetchAll();
        if($result == null)
        {
            return "nop";
        } else {
            return sizeof($result);
        }
    }

    public function setDataInArray($data, $params){
        $arrayData = Array();
        $arrayTmp = Array();
        $result = Array();
        $cpt = 0;

        foreach($data as $value){
            $arrayData = Array(
                $params[0] => $value[$params[0]]
            );

            for($tmp = 1; $tmp < sizeof($params); $tmp++){
                $arrayData[$params[$tmp]] = $value[$params[$tmp]];
            }
            $result[$cpt] = $arrayData;
            $cpt++;
        }
        return $result;
    }
}