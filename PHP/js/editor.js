$( document ).ready(function() {})

const selectFont = document.getElementsByClassName('fontSize')
const selectColor = document.getElementsByClassName('textColor')

$('.buttonBold').mousedown(function(event){
    event.preventDefault()
    putTagsInSelection('span style="font-weight: bold"')
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
                result = text.slice(0, selStart) + "<" + tag + ">" + selection + "</span>" + text.slice(selEnd, text.length)
            }
            //delete
            else{
                selection = selection.toString().slice(tag.length + 2, selection.toString().length - tag.length - 3)
                result = text.slice(0, selStart) + selection + text.slice(selEnd, text.length)
            }
        //add
        } else
            result = text.slice(0, selStart) + "<" + tag + ">" + selection + "</span>" + text.slice(selEnd, text.length)
        activeEl.value = result
    }
}