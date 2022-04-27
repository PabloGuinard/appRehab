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
        $sth = $this->pdo->prepare("SELECT * FROM Categories WHERE nom= :categorie");
        $sth->execute(["categorie" => $categorie]);
        $result = $sth->fetch();
        if($result == false){
            return "Catégorie inexistante";
        } 
        $categorieId = $result["id"];
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE nom= :lesson AND isDeleted != 1");
        $sth->execute(["lesson" => $nom]);
        $result = $sth->fetch();
        if($result != false){
            return "Thème déjà existant";
        }
        $sth = $this->pdo->prepare("INSERT INTO Themes (nom, parentId, isReady) VALUES (:nom, :categorie, -1)");
        $sth->execute(["nom" => $nom, "categorie" => $categorieId]);
        return "Thème ajouté";
    }

    public function addExercice(string $nom, string $lesson){
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE nom= :lesson");
        $sth->execute(["lesson" => $lesson]);
        $result = $sth->fetch();
        if($result == false){
            return "Thème non existant";
        }
        $lessonId = $result["id"];
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE nom= :nom AND isDeleted != 1");
        $sth->execute(["nom" => $nom]);
        $result = $sth->fetch();
        if($result != false){
            return "Exercice déjà existant";
        }
        $sth = $this->pdo->prepare("INSERT INTO Exercices(nom, parentId, isReady) VALUES(:nom, :lessonId, -1)");
        $sth->execute(["nom" => $nom, "lessonId" => $lessonId]);
        return "Exercice ajouté";
    }

    public function addItem(string $contenu, string $exercice, string $typeFile){
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE nom= :exercice");
        $sth->execute(["exercice" => $exercice]);
        $result = $sth->fetch();
        if($result == false){
            return "Exercice non existant";
        }
        $itemId = $result["id"];
        $sth = $this->pdo->prepare("SELECT * ² Items WHERE nom= :nom AND isDeleted != 1");
        $sth->execute(["nom" => $contenu]);
        $result = $sth->fetch();
        if($result != false){
            return "Item déjà existant";
        }
        $sth = $this->pdo->prepare("INSERT INTO Items(nom, typeItem, parentId, isReady) VALUES(:contenu, :typeFile, :exercice, -1)");
        $sth->execute(["exercice" => $itemId, "contenu" => $contenu, "typeFile" => $typeFile]);
        return "Item ajouté";
    }

    public function addMot(string $mot, string $def){
        $sth = $this->pdo->prepare("SELECT * FROM Mots WHERE nom= :mot AND isDeleted != 1");
        $sth->execute(["mot" => $mot]);
        $result = $sth->fetch();
        if($result != false){
            return "Mot déjà existant";
        }
        $sth = $this->pdo->prepare("INSERT INTO Mots(nom, definition, isReady) VALUES(:mot, :def, -1)");
        $sth->execute(["mot" => $mot, "def" => $def]);
        return "Mot ajouté";
    }

    public function deleteLine(string $id, string $table){
        $message = substr($table, 0, -1);
        switch($table){
            case("Themes"):
                $childTable = "Exercices";
                break;
            case("Exercices"):
                $childTable = "Items";
                break;
            default:
                $childTable = "none";
        }
        $request = "SELECT * FROM " . $table . " WHERE id = " . $id;
        $sth = $this->pdo->prepare($request);
        $sth->execute();
        $result = $sth->fetch();
        if($result == false){
            return $message . " non existant";
        }
        echo $childTable;
        if($childTable != "none"){
            $request = "SELECT * FROM " . $childTable . " WHERE parentId = " . $id;
            echo $request;
            $sth = $this->pdo->prepare($request);
            $sth->execute();
            $result = $sth->fetchAll(PDO::FETCH_COLUMN, 0);
            foreach($result as $value){
                echo $value;
                $this->deleteLine($value, $childTable);
            }
        }
        $request = "UPDATE " . $table . " SET isDeleted = 1, isReady = 0 WHERE id = " . $id;
        $sth = $this->pdo->prepare($request);
        $sth->execute();
        return $message . " supprimé";
    }

    public function getCategories(){
        $sth = $this->pdo->prepare("SELECT * FROM Categories");
        $sth->execute();
        $result = $sth->fetchAll(PDO::FETCH_COLUMN, 1);
        return $result;
    }

    public function getCategorieId(string $nom){
        $sth = $this->pdo->prepare("SELECT * FROM Categories WHERE nom= :nom");
        $sth->execute(["nom" => $nom]);
        return $sth->fetch(PDO::FETCH_COLUMN, 0);
    }

    public function getPresentation(){
        $sth = $this->pdo->prepare("SELECT * FROM Presentation");
        $sth->execute();
        $result = $sth->fetch();
        return $result["contenu"];
    }

    public function getTableFromParent(string $parentId, string $tableName){
        $request = "SELECT * FROM " . $tableName . " WHERE parentId = " . $parentId ." AND isDeleted != 1";
        $sth = $this->pdo->prepare($request);
        $sth->execute();
        return $sth->fetchAll();
    }

    public function getAllCommentaires(){
        $sth = $this->pdo->prepare("SELECT * FROM Commentaires WHERE isDeleted != 1");
        $sth->execute();
        return $sth->fetchAll();
    }

    public function getLineFromId(string $id, string $table){
        $request = "SELECT * FROM " . $table . " WHERE id = " . $id;
        $sth = $this->pdo->prepare($request);
        $sth->execute();
        return $sth->fetch();
    }

    public function getAllMots(){
        $sth = $this->pdo->prepare("SELECT * FROM Mots WHERE isDeleted != 1");
        $sth->execute();
        return $sth->fetchAll();
    }

    public function getAllNewLinesInTable($timestamp, $table){
        $request = "SELECT * FROM " . $table . " WHERE isReady = 1";
        $sth = $this->pdo->prepare($request . " AND TIMESTAMP(:myTime) < createdAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getAllModifiedLinesInTable($timestamp, $table){
        $request = "SELECT * FROM " . $table . " WHERE isReady = 1";
        $sth = $this->pdo->prepare($request . " AND TIMESTAMP(:myTime) < modifiedAt AND isDeleted != 1");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getAllDeletedLinesInTable($timestamp, $table){
        $request = "SELECT * FROM " . $table;
        $sth = $this->pdo->prepare($request . " WHERE isDeleted = 1 AND TIMESTAMP(:myTime) < modifiedAt AND isReady = 1");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetchAll();
    }

    public function getPresentationReadyRecent($timestamp){
        $sth = $this->pdo->prepare("SELECT * FROM Presentation WHERE isReady = 1 AND TIMESTAMP(:myTime) < modifiedAt");
        $sth->execute(["myTime" => $timestamp]);
        return $sth->fetch();
    }

    public function addComment(string $rate, string $comment, string $exerciceId){
          $sth = $this->pdo->prepare("INSERT INTO Commentaires (note, commentaire, exerciceId) VALUES (:note, :comment, :exerciceId)");
          $sth->execute(["note" => $rate, "comment" => $comment, "exerciceId" => $exerciceId]);
          $sth->fetch();
    }

    public function updateLine(string $newName, string $id, string $table){
        $request = "UPDATE " . $table . " SET nom = '" . $newName . "', isReady = 0";
        $sth = $this->pdo->prepare($request . " WHERE id = :id");
        $sth->execute(["id" => $id]);
        return substr($table, 0, -1) . " mis à jour";
    }

    public function updateItem(string  $pathItem, string $id, string $typeItem){
        $sth = $this->pdo->prepare("UPDATE Items SET typeItem= :typeItem, nom= :pathItem, isReady=0 WHERE id= :id");
        $sth->execute(["typeItem" => $typeItem, "pathItem" => $pathItem, "id" => $id]);
        return "Item mis à jour";
    }

    public function updatePresentation(string $contenu){
        $sth = $this->pdo->prepare("UPDATE Presentation SET contenu= :contenu, isReady=0");
        $sth->execute(["contenu" => $contenu]);
        echo $sth->fetch();
        return "Présentation mise à jour";
    }

    public function updateMot(string $mot, string $definition, string $id){
        $sth = $this->pdo->prepare("UPDATE Mots SET nom= :mot, definition= :definition, isReady=0 WHERE id= :id");
        $sth->execute(["mot" => $mot, "definition" => $definition, "id" => $id]);
        return "Mot modifié";
    }

    public function supprComm(string $id){
        $sth = $this->pdo->prepare("UPDATE Commentaires SET isDeleted = 1 WHERE id= :id");
        $sth->execute(["id" => $id]);
        return "Commentaire supprimé";
    }

    public function getNomItemFromId(string $id){
        $sth = $this->pdo->prepare("SELECT nom FROM Items WHERE id= :id");
        $sth->execute(["id" => $id]);
        return $sth->fetch();
    }

    public function setIsReadyTrue(){
        $timestamp = date('Y-m-d H-i-s');
        //set modifiedAt field
        $sth = $this->pdo->prepare("UPDATE Themes SET isReady= 1, modifiedAt= :timestamp WHERE isReady = 0");
        $sth->execute(["timestamp" => $timestamp]);
        $sth = $this->pdo->prepare("UPDATE Exercices SET isReady= 1, modifiedAt= :timestamp WHERE isReady = 0");
        $sth->execute(["timestamp" => $timestamp]);
        $sth = $this->pdo->prepare("UPDATE Items SET isReady= 1, modifiedAt= :timestamp WHERE isReady = 0");
        $sth->execute(["timestamp" => $timestamp]);
        $sth = $this->pdo->prepare("UPDATE Mots SET isReady= 1, modifiedAt= :timestamp WHERE isReady = 0");
        $sth->execute(["timestamp" => $timestamp]);
        $sth = $this->pdo->prepare("UPDATE Presentation SET isReady= 1, modifiedAt= :timestamp WHERE isReady = 0");
        $sth->execute(["timestamp" => $timestamp]);
        //set createdAt fields
        $sth = $this->pdo->prepare("UPDATE Themes SET isReady= 1, createdAt= :timestamp WHERE isReady = -1");
        $sth->execute(["timestamp" => $timestamp]);
        $sth = $this->pdo->prepare("UPDATE Exercices SET isReady= 1, createdAt= :timestamp WHERE isReady = -1");
        $sth->execute(["timestamp" => $timestamp]);
        $sth = $this->pdo->prepare("UPDATE Items SET isReady= 1, createdAt= :timestamp WHERE isReady = -1");
        $sth->execute(["timestamp" => $timestamp]);
        $sth = $this->pdo->prepare("UPDATE Mots SET isReady= 1, createdAt= :timestamp WHERE isReady = -1");
        $sth->execute(["timestamp" => $timestamp]);
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