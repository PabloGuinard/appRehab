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
        if(selStart === selEnd)
            return
        let result

        if(text.substr(selStart, 2) === "<" + tag[0]){
            //replace
            if(text.substr(selStart + 1, tag.length) !== tag){
                selection = selection.toString().slice(tag.length + 2, selection.toString().length - tag.length - 3)
                result = text.slice(0, selStart) + selection + text.slice(selEnd, text.length)
                result = text.slice(0, selStart) + "<" + tag + ">" + selection + "</" + tag + ">" + text.slice(selEnd, text.length)
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

//preview
const btPreviews = document.getElementsByClassName('buttonPreview')
const textareasPreviews = document.getElementsByClassName('textPreview')
const textareasEdit = document.getElementsByClassName('textItem')

for (let cpt = 0; cpt < btPreviews.length; cpt++) {
    btPreviews[cpt].addEventListener("click", function(){
        textareasPreviews[cpt].innerHTML = ""
        textareasPreviews[cpt].insertAdjacentHTML("afterbegin", rawToHtml(textareasEdit[cpt].value))
    })
}

function rawToHtml(raw){
    let result = ""
    for (let cpt = 0; cpt < raw.length; cpt++) {
        if(raw[cpt] === "<"){
            let tag = ""
            while(raw[cpt] !== ">"){
                tag += raw[cpt]
                cpt++
            }
            tag += ">"
            switch (tag[1]) {
                case 'g':
                    result += '<span style="font-weight: bold">'
                    break
                case 's':
                    result += '<span style="text-decoration: underline">'
                    break
                case 'i':
                    result += '<span style="font-style: italic">'
                    break
                case 'p':
                    result += '<span style="font-size: ' + tag.substr(2, 2) + 'px">'
                    break
                case '#':
                    result += '<span style="color: ' + tag.substr(1, 7) + '">'
                    break
                case '/':
                    result += '</span>'
                    break
            }
        }
        else if(raw[cpt] === '\n'){
            result += '</br>'
        }
        else {
            result += raw[cpt]
        }
    }
    return result
}

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

let arrayButtons = document.getElementsByClassName("submitEditText")
let arrayTexts = document.getElementsByClassName("textEditText")
let arrayForms = document.getElementsByClassName("formEditText")

for(let cpt = 0; cpt < arrayButtons.length; cpt++){
    arrayButtons[cpt].addEventListener("click", function(event){
        event.preventDefault()
        let text = arrayTexts[cpt].value
        if(text.length !== 0){
            let tags = []
            for (let char = 0; char < text.length; char++) {
                if(text[char] === '<'){
                    tags.push(findTag(text, char))
                    char++
                }
            }
            if(tags.length % 2 != 0){
                setButtonAlert(cpt)
                return
            }
            let array = []
            let cptTmp = 0
            tags.forEach(tag => {
                if(tag.text[1] === '/'){
                    if(array[0].slice(1, array[0].length - 1) !== tag.text.slice(2, tag.text.length - 1)){
                        setButtonAlert(cpt)
                        return
                    }
                    array.shift()
                    cptTmp++
                }
                else{
                    array.unshift(tag.text)
                }
            })
            if(cptTmp !== tags.length / 2){
                setButtonAlert(cpt)
                return
            }
        }
        arrayForms[cpt].submit()
        
    })
}

function findTag(text, pos){
    let tmp = pos
    while(text[tmp] !== '>')
      tmp++
    tmp++
    let tag = {
      close: tmp,
      open: pos,
      length: tmp - pos,
      text: text.substr(pos, tmp - pos),
      isClosing: false
    }
  
    if(tag.text[1] === '/')
      tag.isClosing = true
    return tag
  }

function setButtonAlert(index){
    arrayButtons[index].style.backgroundColor = 'red'
    arrayButtons[index].style.borderColor = 'red'
    arrayButtons[index].innerHTML = "Erreur dans les balises"
    console.log(arrayButtons[index]);
}