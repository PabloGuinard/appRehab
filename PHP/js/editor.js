const editors = document.getElementsByClassName('editor')

const arrayBolds = document.getElementsByClassName('buttonBold')
const arrayUnderlines = document.getElementsByClassName('buttonUnderline')
const arrayItalics = document.getElementsByClassName('buttonItalic')
const arrayFonts = document.getElementsByClassName('buttonFont')
const arrayColors = document.getElementsByClassName('buttonColor')

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

    arrayButtonsEdit[cpt].addEventListener("click", function(event){
        event.preventDefault()
        let text = editors[cpt].innerHTML
        arrayInputsHidden[cpt].value = text
        arrayForms[cpt].submit()
})
}