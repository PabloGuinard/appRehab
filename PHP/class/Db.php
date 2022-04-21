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
        $categorieId = $result["idCategorie"];
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
        $lessonId = $result["idTheme"];
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
        $itemId = $result["idExercice"];
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
        $sth = $this->pdo->prepare("DELETE FROM Mots WHERE mot= :mot");
        $sth->execute(["mot" => $nom]);
        return "Mot supprimé";
    }

    public function deleteExercice(string $nom){
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE nomExercice= :nom");
        $sth->execute(["nom" => $nom]);
        $result = $sth->fetch();
        if ($result == false) {
            return "Exercice non existant";
        }
        $itemId = $result["idExercice"];
        $sth = $this->pdo->prepare("DELETE FROM Items WHERE ExerciceId= :itemId");
        $sth->execute(["itemId" => $itemId]);
        $sth = $this->pdo->prepare("DELETE FROM Exercices WHERE idExercice= :itemId");
        $sth->execute(["itemId" => $itemId]);
        return "Exercice supprimé";
    }

    public function deleteItem(string $id){
        $sth = $this->pdo->prepare("SELECT * FROM Items WHERE idItem= :id");
        $sth->execute(["id" => $id]);
        $result = $sth->fetch();
        if($result == false){
            return "Item non existant";
        }
        $sth = $this->pdo->prepare("DELETE FROM Items WHERE idItem= :id");
        $sth->execute(["id" => $id]);
        return "Item supprimé";
    }

    public function deleteTheme(string $nom){
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE nomTheme= :nom");
        $sth->execute(["nom" => $nom]);
        $result = $sth->fetch();
        if($result == false){
            return "Thème non existant";
        }
        $lessonId = $result["idTheme"];
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE themeId= :lessonId");
        $sth->execute(["lessonId" => $lessonId]);
        $result = $sth->fetchAll(PDO::FETCH_COLUMN, 1);
        foreach ($result as $value){
            $this->deleteExercice($value);
        }
        $sth = $this->pdo->prepare("DELETE FROM Themes WHERE idTheme= :lessonId");
        $sth->execute(["lessonId" => $lessonId]);
        return "Thème supprimé";
    }

    public function deleteCategorie(string $nom){
        $sth = $this->pdo->prepare("SELECT * FROM Categories WHERE nomCategorie= :nom");
        $sth->execute(["nom" => $nom]);
        $result = $sth->fetch();
        if($result == false){
            return "Catégorie non existante";
        }
        $categoryId = $result["idCategorie"];
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE categorieId= :categoryId");
        $sth->execute(["categoryId" => $categoryId]);
        $result = $sth->fetchAll(PDO::FETCH_COLUMN, 1);
        foreach ($result as $value){
            $this->deleteTheme($value);
        }
        $sth = $this->pdo->prepare("DELETE FROM Categories WHERE idCategorie= :categoryId");
        $sth->execute(["categoryId" => $categoryId]);
        return "Catégorie supprimée";
    }

    public function getCategories(){
        $sth = $this->pdo->prepare("SELECT * FROM Categories");
        $sth->execute();
        $result = $sth->fetchAll(PDO::FETCH_COLUMN, 1);
        return $result;
    }

    public function getThemes(){
        $sth = $this->pdo->prepare("SELECT * FROM Themes");
        $sth->execute();
        $result = $sth->fetchAll(PDO::FETCH_COLUMN, 1);
        return $result;
    }

    public function getExercices(){
        $sth = $this->pdo->prepare("SELECT * FROM Exercices");
        $sth->execute();
        $result = $sth->fetchAll(PDO::FETCH_COLUMN, 1);
        return $result;
    }

    public function getMots(){
        $sth = $this->pdo->prepare("SELECT * FROM Mots");
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
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE categorieId= :idCategory");
        $sth->execute(["idCategory" => $idCategory]);
        return $sth->fetchAll(PDO::FETCH_COLUMN, 1);
    }

    public function getExerciceFromTheme(string $idLesson){
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE themeId= :idLesson");
        $sth->execute(["idLesson" => $idLesson]);
        return $sth->fetchAll(PDO::FETCH_COLUMN, 1);
    }

    public function getItemsFromExercice(string $idExercice){
        $sth = $this->pdo->prepare("SELECT * FROM Items WHERE exerciceId= :idExercice");
        $sth->execute(["idExercice" => $idExercice]);
        return $sth->fetchAll();
    }

    public function getAllCommentaires(){
        $sth = $this->pdo->prepare("SELECT * FROM Commentaires");
        $sth->execute();
        return $sth->fetchAll();
    }

    public function getExerciceFromExerciceId(string $id){
        $sth = $this->pdo->prepare("SELECT * FROM Exercices WHERE idExercice= :id");
        $sth->execute(["id" => $id]);
        return $sth->fetch();
    }

    public function getThemeFromThemeId(string $id){
        $sth = $this->pdo->prepare("SELECT * FROM Themes WHERE idTheme= :id");
        $sth->execute(["id" => $id]);
        return $sth->fetch();
    }

    public function getCategorieFromCategorieId(string $id){
        $sth = $this->pdo->prepare("SELECT * FROM Categories WHERE idCategorie= :id");
        $sth->execute(["id" => $id]);
        return $sth->fetch();
    }

    public function getAllMots(){
        $sth = $this->pdo->prepare("SELECT * FROM Mots");
        $sth->execute();
        return $sth->fetchAll();
    }

    public function getAllCategories(){
        $sth = $this->pdo->prepare("SELECT * FROM Categories");
        $sth->execute();
        return $sth->fetchAll();
    }

    public function getAllThemes(){
        $sth = $this->pdo->prepare("SELECT * FROM Themes");
        $sth->execute();
        return $sth->fetchAll();
    }

    public function getAllExercices(){
        $sth = $this->pdo->prepare("SELECT * FROM Exercices");
        $sth->execute();
        return $sth->fetchAll();
    }

    public function getAllItems(){
        $sth = $this->pdo->prepare("SELECT * FROM Items");
        $sth->execute();
        return $sth->fetchAll();
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
        $sth = $this->pdo->prepare("UPDATE Items SET typeItem= :typeItem, pathItem= :pathItem, isReady=0, modifiedAt= :timestamp WHERE idItem= :id");
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
        $sth = $this->pdo->prepare("DELETE FROM Commentaires WHERE idCommentaire= :id");
        $sth->execute(["id" => $id]);
        return "Commentaire supprimé";
    }

    public function getPathItemFromId(string $id){
        $sth = $this->pdo->prepare("SELECT pathItem FROM Items WHERE idItem= :id");
        $sth->execute(["id" => $id]);
        return $sth->fetch();
    }

    public function setIsReadyTrue(){
        $sth = $this->pdo->prepare("UPDATE Categories SET isReady= 1");
        $sth->execute();
        $sth = $this->pdo->prepare("UPDATE Themes SET isReady= 1");
        $sth->execute();
        $sth = $this->pdo->prepare("UPDATE Exercices SET isReady= 1");
        $sth->execute();
        $sth = $this->pdo->prepare("UPDATE Items SET isReady= 1");
        $sth->execute();
        $sth = $this->pdo->prepare("UPDATE Mots SET isReady= 1");
        $sth->execute();
        $sth = $this->pdo->prepare("UPDATE Presentation SET isReady= 1");
        $sth->execute();
        return "App mise à jour";
    }
}