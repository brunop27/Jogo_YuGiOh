
const state = {
    score: {
        payerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-image"),
    },

    fieldCards:{
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
        actions:{
        button: document.getElementById("next-duel"),
    },
}
// Resgatando as cartas
const pathImages = ".src/assets/icons/";
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
// funcao principal que chama outras funcoes ou estado
function init(){

};

init();