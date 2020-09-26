const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')



let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex) //mostrar o atual 
    textElement.innerText = textNode.text

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text;
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })

}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}
//||
function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId === 0) {
        startGame();
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)

}



const textNodes = [
    {
        id: 1,
        text: 'Você acorda subitamente de um pesadelo e percebe que está em uma estrada no meio do deserto, você nota um colar de prata em cima de uma pedra.',
        options: [
            {
                text: 'Pegar colar',
                setState: { necklace: true },
                nextText: 2
            },
            {
                text: 'Não fazer nada',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'Você continua a caminhar e se depara com um mercador oferecendo seus serviços ',
        options: [
            {
                text: 'trocar o colar por uma espada',
                requiredState: (currentState) => currentState.necklace,
                setState: { necklace: false, sword: true },
                nextText: 3
            },
            {
                text: 'trocar o colar por um escudo',
                requiredState: (currentState) => currentState.necklace,
                setState: { necklace: false, shield: true },
                nextText: 3

            },
            {
                text: 'não trocar',

                nextText: 3
            }

        ]
    },
    {
        id: 3,
        text: 'Após se despedir do mercador, o tempo passa e você começa a se sentir cansado. \n Você acaba encontrando uma pequena cidade perto de uma castelo que parecia muito perigoso.'
        ,
        options: [
            {
                text: 'Explorar o castelo',
                nextText: 4

            },
            {
                text: 'Encontrar um pousada para passar a noite na cidade',
                nextText: 5
            },
            {
                text: 'Encontrar um estabulo estabulo para passar a noite',
                nextText: 6
            }

        ]
    },
    {
        id: 4,
        text: 'Você está muito cansado e cai no sono, um monstro acaba aparecendo enquanto você estava dormindo e você é pego de surpresa e acaba sendo eliminado',
        options: [
            {
                text: 'Restart.',
                nextText: 0
            }
        ]
    },
    { 
        
        id: 5,
        text: 'Você não tem dinheiro, para passar a noite na pousada e acaba sendo expulso, os guardas te prendem e te jogam na prisão',
        options: [
            {
                text: 'Restart.',
                nextText: 0
            }
        ]
    },
    {
        id: 6,
        text: 'Você encontra um estabulo e um touro vem correndo em sua direção',
        options: [
            {
                text: 'Atacar o touro com sua espada.',
                requiredState: (currentState) => currentState.sword,
                nextText: 7
            },
            {
                text: 'Se proteger do touro com seu escudo.',
                requiredState: (currentState) => currentState.shield,
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'você é fraco e cai em um buraco o buraco é fundo, acabou-se o mundo',
        options: [
            {
                text: 'Restart',
                nextText: 0
            }

        ]
    }
]





startGame()