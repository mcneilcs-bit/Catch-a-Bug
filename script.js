
// get all screen elements
const screens = document.querySelectorAll('.screen');


const chooseInsectBtns = document.querySelectorAll('.choose-insect-btn');
const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');

// game variables
let seconds = 0;
let score = 0;
let selectedInsect = {};
let timeInterval;
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

    // added timeInterval declaration here
});

function startGame() {
    // avoid multiple intervals
    if (!timeInterval) {
        timeInterval = setInterval(increaseTime, 1000);
    }
}

function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;
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
    setTimeout(() => this.remove(), 2000);
    addInsects();
}

function addInsects() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}

function increaseScore() {
    score++;

    if (score > 19) {
        message.classList.add('visible');
    }
    scoreEl.innerHTML = `Score: ${score}`;
}