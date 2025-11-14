
// get all screen elements
const screens = document.querySelectorAll('.screen');


const chooseInsectBtns = document.querySelectorAll('.choose-insect-btn');
const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');

// game variables
let seconds = 60;
let score = 0;
let selectedInsect = {};
let timeInterval = null;
// achievements 
let achievementsShown = {
    25: false,
    50: false,
    100: false,
    200: false
};

// start the game
startBtn.addEventListener('click', () => screens[0].classList.add('up'));


// choose insect    

chooseInsectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');

        selectedInsect = { src, alt };
        
    

        screens[1].classList.add('up');

        setTimeout(createInsect, 1000);
        startGame();
    });

});
// start game timer


// Starts the game timer and ensures the timer only begins once.
// Call this function when the player selects an insect to begin the game.
function startGame() {
    if (!timeInterval) {    
    timeInterval = setInterval(updateTime, 1000);
    }
}

function updateTime() {
    seconds--;
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;

    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;

    timeEl.innerHTML = `Time: ${m}:${s}`;

    if (seconds <= 0) {
        endGame();

}       
}
// end game 
function endGame() {
    clearInterval(timeInterval);
    timeInterval = null;

    document.querySelectorAll ('.insect').forEach(i => i.remove());

    // show final score 

    const finalScoreText = document.getElementById('final-score-text');
    finalScoreText.innerHTML = `Your final score is ${score} insects caught!`;

    // show game over screen
    document.getElementById("game-over-screen").classList.remove("hidden");
    // Optionally, you can reset the game or redirect to a different screen here
}
// create insect element

function createInsect() {
    const insect = document.createElement('div');
    insect.classList.add('insect');

    const { x, y } = getRandomLocation();
    
    insect.style.position = 'absolute';
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;

    insect.innerHTML = `<img src="${selectedInsect.src}" alt="${selectedInsect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;

    insect.addEventListener('click', catchInsect);

    gameContainer.appendChild(insect);
}

// get random location for insect

function getRandomLocation() {
    const width = gameContainer.offsetWidth;
    const height = gameContainer.offsetHeight;

    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;

    return { x, y };
}

function catchInsect() {
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => this.remove(), 1800);
    addInsects();
}

function addInsects() {
    setTimeout(createInsect, 700);
    setTimeout(createInsect, 1200);
}

//score and achievements
function increaseScore() {
    score++;
    scoreEl.innerHTML = `Score: ${score}`;

    if (score >= 25 && !achievementsShown[25]) { showAchievement('Bug Beginner! 🐛 25 Insects Caught!');
        achievementsShown[25] = true;
    }
    if (score >= 50 && !achievementsShown[50]) { showAchievement('Insect Interceptor! 🦗 50 Insects Caught!');
        achievementsShown[50] = true;
    }
    if (score >= 100 && !achievementsShown[100]) { showAchievement('Critter Crusher! 🐞 100 Insects Caught!');
        achievementsShown[100] = true;
    }
    if (score >= 200 && !achievementsShown[200]) { showAchievement('Master of Mayhem! 🕷️ 200 Insects Caught!');
        achievementsShown[200] = true;
    }
}

// achievement popup display
function showAchievement(text) {
   message.innerHTML = text;
    message.classList.add('visible');

    setTimeout(() => {
        message.classList.remove('visible');
    }, 3000);
}   

// restart game function 

const restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', () => {
    // Reset game variables
    seconds = 60;
    score = 0;
    scoreEl.innerHTML = `Score: 0`;
    timeEl.innerHTML = `Time: 01:00`;

    achievementsShown = {
        25: false,
        50: false,
        100: false,
        200: false
    };

    // Hide game over screen//
    document.querySelectorAll ('.insect').forEach(i => i.remove());

    document.getElementById("game-over-screen").classList.add("hidden");

    // back to game screen
    screens[0].classList.remove('up');
    screens[1].classList.remove('up');
    screens[2].classList.remove('up');
    
});
 const bgMusic = document.getElementById('bg-audio');
 const startGameBtn = document.getElementById('start-btn');

    startGameBtn.addEventListener('click', () => {
        bgMusic.play();
    });
