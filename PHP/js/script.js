$( document ).ready(function() {})


//handle buttons in text editor
const selectFont = document.getElementsByClassName('fontSize')
const selectColor = document.getElementsByClassName('textColor')


$('.buttonBold').mousedown(function(event){
    event.preventDefault()
    putTagsInSelection('g')
})

$('.buttonUnderline').mousedown(function(event){
    event.preventDefault()
    putTagsInSelection('s')
})

$('.buttonItalic').mousedown(function(event){
    event.preventDefault()
    putTagsInSelection('i')
})

$('.buttonFont').mousedown(function(event){
    event.preventDefault()
    let fontSize = 20
    for (let cpt = 0; cpt < selectFont.length; cpt++) {
        if(selectFont[cpt].value !== '20'){
            fontSize = selectFont[cpt].value
            cpt = selectFont.length
        }        
    }
    let font = 'p' + fontSize
    putTagsInSelection(font)
})

$('.buttonColor').mousedown(function(event){
    event.preventDefault()
    let color = '#00000'
    for (let cpt = 0; cpt < selectColor.length; cpt++) {
        if(selectColor[cpt].value !== '#000000'){
            color = selectColor[cpt].value
            cpt = selectFont.length
        }  
    }
    putTagsInSelection(color)
})

function putTagsInSelection(tag){
    selection = window.getSelection()
    let activeEl = document.activeElement;
    let text = activeEl.value
    if(activeEl.value !== undefined){
        let selStart = activeEl.selectionStart;  
        let selEnd = activeEl.selectionEnd;
        let result

        if(text.substr(selStart, 2) === "<" + tag[0]){
            //replace
            if(text.substr(selStart + 1, tag.length) !== tag){
                selection = selection.toString().slice(tag.length + 2, selection.toString().length - tag.length - 3)
                result = text.slice(0, selStart) + selection + text.slice(selEnd, text.length)
                result = text.slice(0, selStart) + "<" + tag + ">" + selection + "</" + tag + ">" + text.slice(selEnd, text.length)
                console.log(result);
            }
            //delete
            else{
                selection = selection.toString().slice(tag.length + 2, selection.toString().length - tag.length - 3)
                result = text.slice(0, selStart) + selection + text.slice(selEnd, text.length)
            }
        //add
        } else
            result = text.slice(0, selStart) + "<" + tag + ">" + selection + "</" + tag + ">" + text.slice(selEnd, text.length)
        activeEl.value = result
    }
}

//line break
$('.textItem').keydown(function(event) {
    console.log(event.keyCode);
    if (event.keyCode == 13) {
        let textArea = document.activeElement
        event.preventDefault();
        let cursorPosition = $('.textItem').prop("selectionStart")
        let text = textArea.value
        textArea.value = text.slice(0, cursorPosition) + "<r>\n" + text.slice(cursorPosition, text.length)
        $('.textItem').prop('selectionEnd', cursorPosition + 4)
    }
})


// handle inputs in items popups
const liens = document.getElementsByClassName('divRadioLien')
const textes = document.getElementsByClassName('divRadioTexte')
const images = document.getElementsByClassName('divRadioImage')
const videos = document.getElementsByClassName('divRadioVideo')

const inputLiens = document.getElementsByClassName('divInputLien')
const inputTextes = document.getElementsByClassName('divInputTexte')
const inputImages = document.getElementsByClassName('divInputImage')
const inputVideos = document.getElementsByClassName('divInputVideo')

const radioImage = document.querySelectorAll('#imageRadio')
const radioLien = document.querySelectorAll('#lienRadio')
const radioTexte = document.querySelectorAll('#texteRadio')
const radioVideo = document.querySelectorAll('#videoRadio')

for (let cpt = 0; cpt < liens.length; cpt++){
    liens[cpt].addEventListener('click', event =>{
        inputLiens[cpt].classList.remove('hidden');
        inputTextes[cpt].classList.add('hidden');
        inputImages[cpt].classList.add('hidden');
        inputVideos[cpt].classList.add('hidden');
        radioTexte[cpt].removeAttribute('checked')
        radioImage[cpt].removeAttribute('checked')
        radioVideo[cpt].removeAttribute('checked')
        radioLien[cpt].setAttribute('checked', 'true')
    })

    textes[cpt].addEventListener('click', event =>{
        inputTextes[cpt].classList.remove('hidden');
        inputLiens[cpt].classList.add('hidden');
        inputImages[cpt].classList.add('hidden');
        inputVideos[cpt].classList.add('hidden');
        radioLien[cpt].removeAttribute('checked')
        radioImage[cpt].removeAttribute('checked')
        radioVideo[cpt].removeAttribute('checked')
        radioTexte[cpt].setAttribute('checked', 'true')
    })

    images[cpt].addEventListener('click', event =>{
        inputImages[cpt].classList.remove('hidden');
        inputTextes[cpt].classList.add('hidden');
        inputLiens[cpt].classList.add('hidden');
        inputVideos[cpt].classList.add('hidden');
        radioTexte[cpt].removeAttribute('checked')
        radioLien[cpt].removeAttribute('checked')
        radioVideo[cpt].removeAttribute('checked')
        radioImage[cpt].setAttribute('checked', 'true')
    })

    videos[cpt].addEventListener('click', event =>{
        inputVideos[cpt].classList.remove('hidden');
        inputTextes[cpt].classList.add('hidden');
        inputLiens[cpt].classList.add('hidden');
        inputImages[cpt].classList.add('hidden');
        radioTexte[cpt].removeAttribute('checked')
        radioLien[cpt].removeAttribute('checked')
        radioImage[cpt].removeAttribute('checked')
        radioVideo[cpt].setAttribute('checked', 'true')
    })
}


//handle popups
let modals = document.getElementsByClassName("modal");
let bts = document.getElementsByClassName("btModal");
let btsClose = document.getElementsByClassName("btClose");
for (let cpt = 0; cpt < bts.length; cpt++){
    bts[cpt].addEventListener('click', function(){
        modals[cpt].style.display = "block"
    })
}

for (let cpt = 0; cpt < btsClose.length; cpt++){
    btsClose[cpt].addEventListener('click', function(){
        modals[cpt].style.display = "none"
    })
}

//handle tree structure
let arrayCategories = document.getElementsByClassName("categorieDataBase");
let arrayThemes = document.getElementsByClassName("titleTheme");
let arrayExercices = document.getElementsByClassName("titleExercice");

for (let i = 0; i < arrayCategories.length; i++) {
    arrayCategories[i].addEventListener("click", function() {
        let children = this.parentElement.parentElement.parentElement.children
        for (let cpt = 0; cpt < children.length; cpt++){
            if(children[cpt].classList.contains("themeNode")){
                children[cpt].classList.toggle("hidden")
            }
        }
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
    })
}
