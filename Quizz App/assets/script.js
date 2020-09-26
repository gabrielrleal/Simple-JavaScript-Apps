//STUDIES-WEB-DEV-SIMPLIFIED

const rightAnswers = document.getElementById('right-answers')
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


let shuffledQuestions, currentQuestionIndex 

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    countRightAnswers = 0 
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }


}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Analise o seguinte código escrito na linguagem Javascript:\n\nvar frutas = new Array("banana", "laranja", "limao");\nfrutas.shift();\nfrutas.splice(1, 1, "uva");\nfor(var i=0; i<frutas.length; i++)\n\xa0\xa0\xa0\xa0 document.write(frutas[i] + " | ");\n\nO resultado correspondente apresentado como saída é:\n\n  ',
        answers: [
            { text: 'banana | laranja | limao | uva |', correct: false },
            { text: 'laranja | uva |', correct: true },
            { text: 'banana | uva | laranja | limao |', correct: false },
            { text: 'laranja | uva | limao', correct: false }
        ]
    },
    {
        question: 'No script NodeJS\n\nexports.myDateTime = function(){\n\xa0\xa0\xa0\xa0return Date();\n};\n\no papel do termo exports é',
        answers: [
            { text: 'Incluir o módulo HTTP', correct: false },
            { text: 'Disparar um request HTML.', correct: false },
            { text: 'Criar um objeto da classe require.', correct: false },
            { text: 'definir o nome da biblioteca corrente como “exports”', correct: true }
        ]
    },
    {
        question: 'Considere o fragmento de programa JavaScript abaixo.\n\nvar str = "123456789";\nvar p = /[^5-7]/g;\nvar resultado = str.match(p);\n\nA variável resultado vai conter\n\n',
        answers: [
            { text: '5,6,7', correct: false },
            { text: '1,2,3,4,8,9', correct: true },
            { text: '1,2,3,4,6,8,9', correct: false },
            { text: '5,7', correct: false }
        ]
    },
    {
        question: 'Atente para o seguinte trecho de programa escrito na biblioteca JavaScript jQuery:\n\n $("p:first").is("num")\n\nÉ correto afirmar que o trecho acima:',

        answers: [
            { text: 'Seleciona todos os elementos <first> da classe .num diretamente dentro de um <p>.', correct: false },
            { text: 'Retorna true se algum elemento do primeiro <p> da página tem a classe num.', correct: true },
            { text: 'Testa se o primeiro elemento de p é pertencente às classes inteiro ou double.', correct: false},
            { text: 'Converte para inteiro os elementos do wrapper jQuery(“ p ”) da classe first.', correct: false}
        ]
    }
]