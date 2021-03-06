//VICTORY CHECK
let victoryCheck = false; 

//MENSAGENS
let noNumberMessage = `😑 You need to type a number...`;
let higherNumberArray = [`😥 Too High! The number is LOWER...`, `😩 Too high! Go DOWN!`, `😣 LOWER! It's too high!`, `🤔 C'mon... Go DOWN!`];
let lowerNumberArray = [`😥 Too Low! The number is HIGHER...`, `😩 Too low! Go UP!`, `😣 HIGHER! It's too low!`, `🤔 C'mon... Go UP!`];


//GERAR NÚMERO ALEATÓRIO
let secretNumber = Math.trunc(Math.random() * 20 + 1);
console.log(`What are you trying to find here?! :P`);

//VARIÁVEL QUE ARMAZENA SCORE E HIGHSCORE
let score = Number(document.querySelector(".score").textContent);
let highscore = 0; 

//EFEITOS SONOROS
let soundOn = true;
const victoryAudio = new Audio('audio/Victory.ogg');
const wrongAudio = new Audio('audio/Wrong.ogg');
const lostAudio = new Audio('audio/Lost.ogg');

//CONTROLADOR DE ÁUDIO
document.querySelector(".audio-controller").addEventListener("click", function() {
    if (soundOn === true) {
        document.querySelector(".audio-controller").innerHTML = `<i class="fas fa-volume-mute"></i>`;
        soundOn = false; //THE SOUND IS OFF

    } else if (soundOn === false) {
        document.querySelector(".audio-controller").innerHTML = `<i class="fas fa-volume-up"></i>`;
        soundOn = true; //THE SOUND IS ON
    }   

})

//RE-ROLL
document.querySelector(".again").addEventListener("click", function() {
    victoryCheck = false;
    document.querySelector(".guess").value = " ";
    document.querySelector(".message").textContent = `A new secret number was defined!`;
    document.querySelector(".message").style.background = `rgba(238, 238, 238, 0.185)`;
    secretNumber = Math.trunc(Math.random() * 20 + 1);
    console.log(`New_Secret_Value: ${secretNumber}`);
    score = 10;    
    document.querySelector(".score").textContent = score;
    document.querySelector(".number").innerHTML = '?';    
    document.querySelector(".number").style.background = `rgba(238, 238, 238, 0.185)`;
})

//EVENT LISTENER QUANDO CLICAR NO BOTÃO 'GUESS' - vai executar função que vai checar se o número digitado é igual
document.querySelector(".check").addEventListener("click", function (guess) {

    guess = document.querySelector(".guess").value;

    if (victoryCheck === true) {
        document.querySelector(".message").textContent = `You got it right! Reset to play again!`;
        document.querySelector(".message").style.background = `rgba(255, 0, 0, 0.5)`;
    }
    
    else if (!guess) { //Nenhum número foi digitado
        if (soundOn === true) wrongAudio.play();
        document.querySelector(".message").textContent = `${noNumberMessage}`;
        document.querySelector(".message").style.background = `rgba(255, 0, 0, 0.5)`;

    } else if (guess > secretNumber) { //Número é MAIOR que o segredo
        if (soundOn === true) wrongAudio.play();
        let higherNumberMessage = higherNumberArray[Math.trunc(Math.random() * higherNumberArray.length)];
        console.log(higherNumberMessage);
        document.querySelector(".message").textContent = `${higherNumberMessage}`;
        document.querySelector(".message").style.background = `rgba(255, 0, 0, 0.5)`;
        score--;
        document.querySelector(".score").textContent = score;
        if (score < 1) lose(); 
        
    } else if (guess < secretNumber) { //Número é MENOR que o segredo
        if (soundOn === true) wrongAudio.play();
        let lowerNumberMessage = lowerNumberArray[Math.trunc(Math.random() * lowerNumberArray.length)];
        console.log(lowerNumberMessage);
        document.querySelector(".message").textContent = `${lowerNumberMessage}`;
        document.querySelector(".message").style.background = `rgba(255, 0, 0, 0.5)`;
        score--;
        document.querySelector(".score").textContent = score;
        if (score < 1) lose(); 

    } else if (guess == secretNumber) {    //Se o número for IGUAL ao segredo     
        victory();        

    }
     
  });

//FUNÇÕES DE VITÓRIA/DERROTA
function lose() {
    if (soundOn === true) lostAudio.play();    
    document.querySelector(".score").textContent = 0;
    document.querySelector(".message").textContent = `😭 Oh no! You LOST!`;
    document.querySelector(".message").style.background = `rgba(255, 0, 0, 0.5)`;
}

function victory() {
    victoryCheck = true;
    if (soundOn === true) victoryAudio.play();        
    document.querySelector(".message").style.background = `rgba(94, 255, 0, 0.8)`;
    document.querySelector(".number").innerHTML = secretNumber;    
    document.querySelector(".number").style.background = `rgba(94, 255, 0, 0.8)`;
    if (score > highscore) {
        highscore = score; //Atualiza o Highscore
        document.querySelector(".highscore").textContent = highscore; //Escreve o highscore na tela
        document.querySelector(".message").textContent = `😎 You guessed it right and broke your record! ✔`;
    } else {
        document.querySelector(".message").textContent = `😎 OH WOW! You guessed it right! ✔ `;
    }
}

//FUNÇÕES QUE CONTROLAM OS BOTÕES PARA SUBIR/DESCER O VALOR

document.querySelector(".up").addEventListener("click", function (x) {
    
    x = document.querySelector(".guess").value; 
    x++;
    document.querySelector(".guess").value = x;    

})

document.querySelector(".down").addEventListener("click", function (x) {    
    x = document.querySelector(".guess").value; 
    x--;
    document.querySelector(".guess").value = x;
   
})


