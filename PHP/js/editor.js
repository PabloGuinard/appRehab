const editors = document.getElementsByClassName('editor')

const arrayBolds = document.getElementsByClassName('buttonBold')
const arrayUnderlines = document.getElementsByClassName('buttonUnderline')
const arrayItalics = document.getElementsByClassName('buttonItalic')
const arrayFonts = document.getElementsByClassName('buttonFont')
const arrayColors = document.getElementsByClassName('buttonColor')
const arrayJustifyLeft = document.getElementsByClassName('buttonJustifyLeft')
const arrayJustifyCenter = document.getElementsByClassName('buttonJustifyCenter')
const arrayJustifyRight = document.getElementsByClassName('buttonJustifyRight')
const arrayLinks = document.getElementsByClassName('buttonLink')
const arrayCleans = document.getElementsByClassName('buttonClean')

const selectFont = document.getElementsByClassName('fontSize')
const selectColor = document.getElementsByClassName('textColor')

const arrayButtonsEdit = document.getElementsByClassName("submitEditText")
const arrayInputsHidden = document.getElementsByClassName("inputTextItem")
const arrayForms = document.getElementsByClassName("formEditText")

function insertTag(tag, cpt, value){
    document.execCommand(tag, false, value)
    editors[cpt].focus()
}


for (let cpt = 0; cpt < arrayBolds.length; cpt++) {
    arrayBolds[cpt].addEventListener("click", event => {
        insertTag('bold', cpt)
    }) 
    arrayUnderlines[cpt].addEventListener("click", event => {
        insertTag('underline', cpt)
    }) 
    arrayItalics[cpt].addEventListener("click", event => {
        insertTag('italic', cpt)
    }) 
    arrayFonts[cpt].addEventListener("change", event => {
        insertTag('fontsize', cpt, arrayFonts[cpt].value)
    }) 
    arrayColors[cpt].addEventListener("change", event => {
        insertTag('forecolor', cpt, arrayColors[cpt].value)
    }) 
    arrayJustifyLeft[cpt].addEventListener("click", event => {
        insertTag('justifyleft', cpt)
    }) 
    arrayJustifyCenter[cpt].addEventListener("click", event => {
        insertTag('justifycenter', cpt)
    }) 
    arrayJustifyRight[cpt].addEventListener("click", event => {
        insertTag('justifyright', cpt)
    }) 
    arrayLinks[cpt].addEventListener("click", event => {
        let link = prompt('URL','http:\/\/')
        if(link && link !== '' && link !== 'http://')
            insertTag('createlink', cpt, link)
    })  
    arrayCleans[cpt].addEventListener("click", event => {
        if(confirm("Supprimer tout le style du texte ?")){
            text = editors[cpt].innerHTML
            let char = 0
            while(char < text.length){
                if(text[char] === '<'){
                    let close = char
                    while(text[close] !== '>' && close < text.length - 1){
                        close++
                    }
                    let tmp = ""
                    if(char !== 0)
                        tmp += text.substr(0, char)
                    if(close !== text.length - 1)
                        tmp += text.substr(close + 1)
                    text = tmp
                    char = 0
                }
                char++
            }
            if(text[0] === '<'){
                let close = 0
                while(text[close] !== '>')
                    close++
                text = text.substr(close + 1)
            }
            editors[cpt].innerHTML = text
        }
    }) 

    arrayButtonsEdit[cpt].addEventListener("click", function(event){
        event.preventDefault()
        let text = editors[cpt].innerHTML
        arrayInputsHidden[cpt].value = text
        arrayForms[cpt].submit()
})
}