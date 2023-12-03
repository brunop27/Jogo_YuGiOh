
const state = {
    score: {
        payerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },

    fieldCards:{
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
        actions:{
        button: document.getElementById("next-duel"),
    },
}

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",
}

// Resgatando as cartas
const pathImages = "./src/assets/icons/";
const cardData =[
    {
        id: 0,
        name: "Blue Eyes White Dagon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        WinOf: [1],
        LoseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf: [2],
        LoseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf: [0],
        LoseOf: [1],
    },
]

// Pegando id aleatorio aleatorio da carta
async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

// Usada para buscar e implementar qual carta em qual lado vai
async function createCardImage(idCard, fieldSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id",idCard);
    cardImage.classList.add("card");

    if (fieldSide === playerSides.player1) {
        cardImage.addEventListener("click", ()=>{
            setCardField(cardImage.getAttribute("data-id"));
        })
    }

    cardImage.addEventListener("mouseover", ()=>{
        drawSelectCard(idCard);
    });

    return cardImage;
}

async function drawSelectCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Atributte: "+ cardData[index].type;
}

//Sortea as cartas pro lado inimigo e player
async function drawCards(cardNumbers, fieldSide){
    for (let index = 0; index < cardNumbers; index++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

// funcao principal que chama outras funcoes ou estado
function init(){
    drawCards(5,playerSides.player1);
    drawCards(5,playerSides.computer);
};

init();