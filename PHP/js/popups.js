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


//close item udpate popup
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