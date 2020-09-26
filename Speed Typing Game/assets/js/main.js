//estudo Web Dev Simplified 
const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'; //api que gera aleatoriamente citações
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

quoteInputElement.addEventListener('input', () => {//pegando todos input, oque se digita
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')//pega cada span que está em quoteDisplayElement
    const arrayValue = quoteInputElement.value.split('')// separar por espaços vazios, convertendo as strings em arrays 

    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {// digitou incorretamente
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if (character === characterSpan.innerText) {//digitou corretamente
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')

        } else {
            characterSpan.classList.remove('correct') //digitou incorretamente
            characterSpan.classList.add('incorrect')
            correct = false
        }

    })

    if (correct) renderNewQuote()
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerText = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.classList.add('correct')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })

    quoteInputElement.value = null
    startTimer()

}

let startTime
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimertime()
    }, 1000)
}

function getTimertime() {
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()