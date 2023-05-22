const iconEle = document.querySelector('i');
const inputEle  = document.querySelector('input');
const notFoundEle = document.querySelector('.notFound');
const sugEle  = document.querySelector('.sug');
const defEle = document.querySelector('.def');
const wordSoundEle = document.querySelector('.word-sound');
const outputEle = document.querySelector('.output-wrapper');

/* This code is adding a click event listener to the `iconEle` element (which is an icon). When the
icon is clicked, it calls the `reset()` function to clear any previous results, gets the value of
the input element (`inputEle`), and checks if it is empty. If it is empty, it removes a CSS class
from the icon element and displays an alert message asking the user to type a word. If the input has
a value, it calls the `callApi()` function with the word as an argument to fetch data from an API
and display the results. */
iconEle.addEventListener('click',() => {
    reset();

    const word = inputEle.value;
    if(!word)
    {
        iconEle.classList.remove('fa-beat-fade');
        alert('Type a word!!');
        return;
    }
    callApi(word);
})

/**
 * The function resets certain elements on a webpage.
 */
function reset() {
    iconEle.classList.add('fa-beat-fade');
    notFoundEle.innerText = '';
    sugEle.innerHTML = '';
    defEle.innerHTML = '';
    wordSoundEle.innerHTML = '';
}

/**
 * The function calls an API to retrieve the definition of a given word and generates suggestions or
 * definitions based on the response.
 * @param word - The word that is being searched in the dictionary API.
 * @returns The function `callApi` is not returning anything explicitly.
 */
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
        generateSuggestions(data);
        return;
    }

    iconEle.classList.remove('fa-beat-fade');
    generateDefination(data, word, apiKey);
}

/**
 * The function generates suggestions for user input and adds them to the HTML document.
 * @param data - The parameter "data" is an array of strings that contains the suggestions to be
 * displayed to the user.
 */
function generateSuggestions(data) {
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
}

/**
 * The function generates a definition and audio for a given word using data and an API key.
 * @param data - an object containing the definition and other information about a word, obtained from
 * an API call
 * @param word - The word for which the definition is being generated.
 * @param apiKey - The API key is a unique identifier that allows access to a specific API. It is
 * usually provided by the API provider and is required to make API requests.
 */
function generateDefination(data, word, apiKey) {
    wordSoundEle.style.display = 'flex';
    wordSoundEle.innerHTML = `  <h2>${word}</h2>
    <i class="fa-solid fa-volume-high"></i>`;
    const volIcon = wordSoundEle.children[1];

    const def = data[0].shortdef[0];
    defEle.innerHTML = `<span style="font-weight: bold;">${def}</span>`;
    generateAudio(data, apiKey, volIcon);
}

/**
 * The function generates an audio object and plays the pronunciation of a word if available, otherwise
 * it displays an alert message.
 * @param data - an object containing data related to a word, such as its pronunciation and definition
 * @param apiKey - an API key used to access the Merriam-Webster API and retrieve audio files for word
 * pronunciations.
 * @param volIcon - This parameter is likely a reference to an HTML element that represents a volume
 * icon. The function adds a click event listener to this element to play the audio file when clicked.
 */
function generateAudio(data, apiKey, volIcon) {
    const audioFile = data[0]?.hwi?.prs?.[0]?.sound?.audio;
    if(audioFile) {
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
