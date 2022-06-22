let arrayCategories = document.getElementsByClassName("categorieDataBase");
let arrayThemes = document.getElementsByClassName("titleTheme");
let arrayExercices = document.getElementsByClassName("titleExercice");

let arrayOpenNodes
arrayOpenNodes = JSON.parse(localStorage.getItem("arrayOpenNodes"))
if(arrayOpenNodes === null){
    arrayOpenNodes = {
        categories: Array(),
        themes: Array(),
        exercices: Array()
    }
    for (let cpt = 0; cpt < arrayCategories.length; cpt++) {
        arrayOpenNodes.categories[cpt] = false
    }
    for (let cpt = 0; cpt < arrayThemes.length; cpt++) {
        arrayOpenNodes.themes[cpt] = false
    }
    for (let cpt = 0; cpt < arrayExercices.length; cpt++) {
        arrayOpenNodes.exercices[cpt] = false
    }
} else {
    for (let cpt = 0; cpt < arrayOpenNodes.categories.length; cpt++) {
        if(arrayOpenNodes.categories[cpt]){
            let children = arrayCategories[cpt].parentElement.parentElement.parentElement.children
            for (let cpt = 0; cpt < children.length; cpt++){
                if(children[cpt].classList.contains("themeNode")){
                    children[cpt].classList.toggle("hidden")
                }
            }
        }
    }
    for (let cpt = 0; cpt < arrayOpenNodes.themes.length; cpt++) {
        if(arrayOpenNodes.themes[cpt]){
            let children = arrayThemes[cpt].parentElement.parentElement.children
            for (let cpt = 0; cpt < children.length; cpt++){
                if(children[cpt].classList.contains("exerciceNode")){
                    children[cpt].classList.toggle("hidden")
                }
            }
        }
    }
    for (let cpt = 0; cpt < arrayOpenNodes.exercices.length; cpt++) {
        if(arrayOpenNodes.exercices[cpt]){
            let children = arrayExercices[cpt].parentElement.parentElement.children
            for (let cpt = 0; cpt < children.length; cpt++){
                if(children[cpt].classList.contains("itemNode")){
                    children[cpt].classList.toggle("hidden")
                }
            }
        }
    }
}

for (let i = 0; i < arrayCategories.length; i++) {
    arrayCategories[i].addEventListener("click", function() {
        let children = this.parentElement.parentElement.parentElement.children
        for (let cpt = 0; cpt < children.length; cpt++){
            if(children[cpt].classList.contains("themeNode")){
                children[cpt].classList.toggle("hidden")
            }
        }
        arrayOpenNodes.categories[i] = !arrayOpenNodes.categories[i]
        localStorage.setItem("arrayOpenNodes", JSON.stringify(arrayOpenNodes))
    });
}

for (let i = 0; i < arrayThemes.length; i++){
    arrayThemes[i].addEventListener('click', function (){
        let children = this.parentElement.parentElement.children
        for (let cpt = 0; cpt < children.length; cpt++){
            if(children[cpt].classList.contains("exerciceNode")){
                children[cpt].classList.toggle("hidden")
            }
        }
        arrayOpenNodes.themes[i] = !arrayOpenNodes.themes[i]
        localStorage.setItem("arrayOpenNodes", JSON.stringify(arrayOpenNodes))
    })
}
for (let i = 0; i < arrayExercices.length; i++){
    arrayExercices[i].addEventListener('click', function (){
        let children = this.parentElement.parentElement.children
        for (let cpt = 0; cpt < children.length; cpt++){
            if(children[cpt].classList.contains("itemNode")){
                children[cpt].classList.toggle("hidden")
            }
        }
        arrayOpenNodes.exercices[i] = !arrayOpenNodes.exercices[i]
        localStorage.setItem("arrayOpenNodes", JSON.stringify(arrayOpenNodes))
    })
}

let btClose = document.getElementById('buttonResetTreeStructure')
btClose.addEventListener('click', function(){
    console.log("test");

    for (let cpt = 0; cpt < arrayOpenNodes.categories.length; cpt++) {
        if(arrayOpenNodes.categories[cpt]){
            let children = arrayCategories[cpt].parentElement.parentElement.parentElement.children
            for (let cpt = 0; cpt < children.length; cpt++){
                if(children[cpt].classList.contains("themeNode")){
                    children[cpt].classList.toggle("hidden")
                }
            }
        }
    }
    for (let cpt = 0; cpt < arrayOpenNodes.themes.length; cpt++) {
        if(arrayOpenNodes.themes[cpt]){
            let children = arrayThemes[cpt].parentElement.parentElement.children
            for (let cpt = 0; cpt < children.length; cpt++){
                if(children[cpt].classList.contains("exerciceNode")){
                    children[cpt].classList.toggle("hidden")
                }
            }
        }
    }
    for (let cpt = 0; cpt < arrayOpenNodes.exercices.length; cpt++) {
        if(arrayOpenNodes.exercices[cpt]){
            let children = arrayExercices[cpt].parentElement.parentElement.children
            for (let cpt = 0; cpt < children.length; cpt++){
                if(children[cpt].classList.contains("itemNode")){
                    children[cpt].classList.toggle("hidden")
                }
            }
        }
    }

    
    arrayOpenNodes = {
        categories: Array(),
        themes: Array(),
        exercices: Array()
    }
    for (let cpt = 0; cpt < arrayCategories.length; cpt++) {
        arrayOpenNodes.categories[cpt] = false
    }
    for (let cpt = 0; cpt < arrayThemes.length; cpt++) {
        arrayOpenNodes.themes[cpt] = false
    }
    for (let cpt = 0; cpt < arrayExercices.length; cpt++) {
        arrayOpenNodes.exercices[cpt] = false
    }
    localStorage.setItem("arrayOpenNodes", JSON.stringify(arrayOpenNodes))
})
