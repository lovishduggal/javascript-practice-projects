const iconEle = document.querySelector('i');
const inputEle  = document.querySelector('input');
const notFoundEle = document.querySelector('.notFound');
const sugEle  = document.querySelector('.sug');
const defEle = document.querySelector('.def');
const wordSoundEle = document.querySelector('.word-sound');
const outputEle = document.querySelector('.output-wrapper');
iconEle.addEventListener('click',() => {
    iconEle.classList.add('fa-beat-fade');
    notFoundEle.innerText = '';
    sugEle.innerHTML = '';
    defEle.innerHTML = '';
    wordSoundEle.innerHTML = '';

    const word = inputEle.value;

    /* This code is checking if the value of the input field (referred to as `word`) is empty or not. If it
    is empty, it will display an alert message saying "Type a word!!" and then return from the function.
    This is a validation check to ensure that the user has entered some input before proceeding with any
    further actions. */
    if(!word)
    {
        iconEle.classList.remove('fa-beat-fade');
        alert('Type a word!!');
        return;
    }
    callApi(word);
})

async function callApi(word) {
    const apiKey = '3673c996-b054-4511-bbff-9fad4f844f7e';
    const  URL = `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`;

    const response = await fetch(URL);
    const data = await response.json();

    if(!data.length) {
      iconEle.classList.remove('fa-beat-fade');
      notFoundEle.innerText = 'Word not found!!';
      return;
    }

    if(typeof data[0] === 'string') {
        iconEle.classList.remove('fa-beat-fade');

        const h3Ele = document.createElement('h3');
        h3Ele.innerText = 'Do you mean that?';
        h3Ele.style.fontWeight = 'bold';
        sugEle.append(h3Ele);
        data.forEach(element => {
            const spanEle = document.createElement('span');
            spanEle.innerText = element;
            spanEle.addEventListener('click', () => inputEle.value = element);
            sugEle.append(spanEle);
        });
        return;
    }

    iconEle.classList.remove('fa-beat-fade');

    wordSoundEle.style.display = 'flex';
    wordSoundEle.innerHTML = `  <h2>${word}</h2>
    <i class="fa-solid fa-volume-high"></i>`;
    const volIcon = wordSoundEle.children[1];

    const def = data[0].shortdef[0];
    defEle.innerHTML = `<span style="font-weight: bold;">${def}</span>`;
    if(data[0].hwi.prs !== undefined) {
    const audioFile = data[0].hwi.prs[0].sound.audio;
    const subFold = audioFile.charAt(0);
    const src = `https://media.merriam-webster.com/soundc11/${subFold}/${audioFile}.wav?key=${apiKey}`;
    const audioObj = new Audio(src);
    volIcon.addEventListener('click', () => audioObj.play());
   }
   else{
     volIcon.style.display = 'none';
     alert('Pronunciation is unavailable. To see the defination click on OK!!');
   }
}
