const button = document.getElementById("joke-button");
const audioElement = document.getElementById("audio");
const jokeText = document.getElementById("joke-text");

// Toggling the button
function toggleButton() {
    button.disabled = !button.disabled;
}

// get voice from VoiceRSS API
function tellJoke(joke){
    const jokeString = joke.trim().replace(/ /g, "%20");
    VoiceRSS.speech({
        key: '2cc8e888fc304dc6bfcccf12c5a4c402',
        src: jokeString,
        hl: 'en-us',
        v: 'Harry',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from Joke API
async function getJokes(){
    let joke = '';
    const apiUrl = "https://v2.jokeapi.dev/joke/Programming,Dark?blacklistFlags=nsfw,religious,racist,sexist,explicit";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check one OR two part joke
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`
        }
        else{
            joke = data.joke;
        }
        // Text to speech
        tellJoke(joke);
        // handling joke
        if(joke){
            // adding text area for display joke text
            jokeText.hidden = false;
            jokeText.value = joke;
            // handling button
            toggleButton();
        }

    } catch (error) {
        console.log(error);
    }
}

// Event Listners
button.addEventListener("click",getJokes);
audioElement.addEventListener("ended", toggleButton);