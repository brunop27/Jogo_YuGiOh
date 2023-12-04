
const state = {
    score: {
        playerScore: 0,
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
    playerSides: {
        player1: "player-cards",
        player1Box: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBox: document.querySelector("#computer-cards"),
    },
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
    cardImage.setAttribute("height", "110px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id",idCard);
    cardImage.classList.add("card");

    if (fieldSide === state.playerSides.player1) {
        cardImage.addEventListener("mouseover", ()=>{
            drawSelectCard(idCard);
        });
        cardImage.addEventListener("click", ()=>{
            setCardsField(cardImage.getAttribute("data-id"));
        })
    }

    return cardImage;
}

async function setCardsField(cardId){
    // Remove todas as cartas
    await removeAllCarsImages();

    await showHiddenCardFieldsImages(true);
    // Sorteia uma carta para o computador e muda o display
    let computerCardId = await getRandomCardId();

    let duelResults = await checkDuelResult(cardId, computerCardId);

    await drawCardsInField(cardId, computerCardId)
    await hiddenCardDetails();
    await updateScore();
    await drawButton(duelResults);
};

async function drawCardsInField(cardId, computerId){
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerId].img;
}

async function showHiddenCardFieldsImages(valor){
    if(valor){
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    }

    if(!valor){
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";    
    }
}

async function hiddenCardDetails(){

    state.cardSprites.avatar.src = " ";
    state.cardSprites.name.innerText = " ";
    state.cardSprites.type.innerText = " ";
}
async function updateScore(){
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function drawButton(text){
    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";
}

async function checkDuelResult(palyerCardId, computerCardId){
    let duelResults = "DRAW";
    let playerCard = cardData[palyerCardId];
    if(playerCard.WinOf.includes(computerCardId)){
        duelResults = "WIN";
        state.score.playerScore++;
    }

    if(playerCard.LoseOf.includes(computerCardId)){
        duelResults = "LOSE";
        state.score.computerScore++;
    }

    await playAudio(duelResults);

    return duelResults;
}

async function removeAllCarsImages(){
    let {player1Box, computerBox} = state.playerSides;
    let imgElements = computerBox.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = player1Box.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
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

// Reseta o jogo, levando o jogador ao estado inicial do jogo
async function resetDuel(){
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
    init();
}

async function playAudio(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`);

    try {
        audio.play();
    } catch{ }
}

// funcao principal que chama outras funcoes ou estado
function init(){
    showHiddenCardFieldsImages(false);
    drawCards(5,state.playerSides.player1);
    drawCards(5,state.playerSides.computer);

    const bgm = document.getElementById("bgm");
    bgm.play();
};

init();