const section = document.querySelector('section');
const h1 = document.querySelector('h1');
const UI = document.getElementById('UI');
const arrow = document.getElementById('arrow');
let currentdate = new Date();
let dateTime = "Local: [" + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + "]";

// USER INTERFACE
let UIActive = true;
arrow.setAttribute('draggable', false);
h1.setAttribute('draggable', false);
arrow.addEventListener('click', (e) => {
    if (UIActive == true) {
        UI.style.animationName = `revealUI`;
        UIActive = false;
    } else if (UIActive == false) {
        UI.style.animationName = `hideUI`;
        UIActive = true;
    }
});
// WELCOMING LETTER
let errorNotif = document.getElementById('alert');
errorNotif.innerText += `Hello and welcome to my project, Bouncing Balls. It started small and once I realized that I should've gone to canvas instead of DOM elements it was already too late. Anyways, here we are now; this site is a simulation of balls under different gravity, physics, numbers, and sizes. There are a few bugs as boundaries and bounding boxes are extremely unreliable sources for collision detection but that is because of my folly. I have nothing else left to add, so enjoy messing around and have a good one.\n -Lucas`;
// NUT COUNT UI
let nutCountNumber = document.getElementById('nutCountNumber');
nutCountNumber.addEventListener('change', (e) => {
    nutCountNumber = document.getElementById('nutCountNumber').value;
    if (nutCountNumber < 0) {
        errorNotif.innerText += `\n\n${dateTime}` + " Can't have negative nuts!";
        nutCount = 0;
        document.getElementById('nutCountNumber').value = "0";
    } else if (nutCountNumber != parseInt(nutCountNumber)) {
        errorNotif.innerText += `\n\n${dateTime}` + " Can only accept integers. Rounded to nearest value.";
        nutCount = Math.round(nutCountNumber);
        document.getElementById('nutCountNumber').value = `${nutCount}`;
    }
});
// NUT SIZE UI
let nutSizeNumber = document.getElementById('nutSizeNumber');
nutSizeNumber.addEventListener('change', (e) => {
    nutSizeNumber = document.getElementById('nutSizeNumber').value;
    if (nutSizeNumber <= 0) {
        errorNotif.innerText += `\n\n${dateTime}` + " Nut size has to be greater than 0!";
        for (let i = 0; i < nutCount; i++) {
            nut[i].size = nutSizeNumber;
        }
        document.getElementById('nutSizeNumber').value = "1";
    }
});
// NUT GRAVITY UI
let gravityOptions = [];
for (let o = 0; o < 3; o++) {
    gravityOptions[o] = document.getElementById(`gravity${o}`);
    gravityOptions[o].classList.add('selected');
}
gravityOptions[0].addEventListener('click', (e) => {
    gravityOptions[0].style.animationName = "selectedMode1";
    gravityOptions[1].style.animationName = "selectedMode2Rev";
    gravityOptions[2].style.animationName = "selectedMode3Rev";
});
gravityOptions[1].addEventListener('click', (e) => {
    gravityOptions[1].style.animationName = "selectedMode2";
    gravityOptions[0].style.animationName = "selectedMode1Rev";
    gravityOptions[2].style.animationName = "selectedMode3Rev";
});
gravityOptions[2].addEventListener('click', (e) => {
    gravityOptions[2].style.animationName = "selectedMode3";
    gravityOptions[0].style.animationName = "selectedMode1Rev";
    gravityOptions[1].style.animationName = "selectedMode2Rev";
});
// NUT PHYSICS UI
let physicsOptions = [];
for (let o = 0; o < 3; o++) {
    physicsOptions[o] = document.getElementById(`physics${o}`);
    physicsOptions[o].classList.add('selected');
}
physicsOptions[0].addEventListener('click', (e) => {
    physicsOptions[0].style.animationName = "selectedTaut1";
    physicsOptions[1].style.animationName = "selectedTaut2Rev";
    physicsOptions[2].style.animationName = "selectedTaut3Rev";
});
physicsOptions[1].addEventListener('click', (e) => {
    physicsOptions[1].style.animationName = "selectedTaut2";
    physicsOptions[0].style.animationName = "selectedTaut1Rev";
    physicsOptions[2].style.animationName = "selectedTaut3Rev";
});
physicsOptions[2].addEventListener('click', (e) => {
    physicsOptions[2].style.animationName = "selectedTaut3";
    physicsOptions[0].style.animationName = "selectedTaut1Rev";
    physicsOptions[1].style.animationName = "selectedTaut2Rev";
});

// NUT CODE
const nut = [];
let nutCount = 10;
const time = 10;
const width = window.innerWidth;
const height = window.innerHeight;
for (let i = 0; i < nutCount; i++) {
    // NUT TIME DILATION [DEBUG TOOL]
    h1.addEventListener('click', (e) => {
        clearInterval(colorInterval);
        clearInterval(travelInterval);
        clearInterval(boundaryInterval);
    });
    // NUT GENESIS
    nut[i] = {
        root: document.createElement('div'),
        size: 1.25,
        color: [(Math.random()*255), (Math.random()*255), (Math.random()*255)],
        position: [(Math.random()*100).toFixed(2) - 0, (Math.random()*100).toFixed(2) - 0],
        vector: Math.random()*360
    };
    // NUT INITIAL COMPILATION
    nut[i].vector = [Math.cos(nut[i].vector), Math.sin(nut[i].vector)];
    nut[i].root.classList.add('nut');
    nut[i].root.style.width = `${nut[i].size*50}px`;
    nut[i].root.style.height = `${nut[i].size*50}px`;
    nut[i].root.style.clipPath = `circle(${nut[i].size*25}px at ${nut[i].size*25}px ${nut[i].size*25}px)`;
    nut[i].root.style.backgroundColor = `rgba(${nut[i].color[0]}, ${nut[i].color[1]}, ${nut[i].color[2]})`;
    nut[i].root.style.left = nut[i].position[0] + '%';
    nut[i].root.style.top = nut[i].position[1] + '%';
    // NUT SPEED
    let travelInterval = setInterval(() => {nutTravel();}, time);
    function nutTravel() {  
        nut[i].root.style.left = ((nut[i].position[0] += (1 * nut[i].vector[0])) / nut[i].size) + '%';
        nut[i].root.style.top = ((nut[i].position[1] += (1 * nut[i].vector[1])) / nut[i].size) + '%';
        detectCollision();
    }
    // NUT COLOR SHIFT
    let colorInterval = setInterval(() => {colorTransition();}, time);
    function colorTransition() {
        if (nut[i].color[0] >= 255) {
        nut[i].color[0] = 1;
        } else if (nut[i].color[1] >= 255) {
        nut[i].color[1] = 1;
        } else if (nut[i].color[2] >= 255) {
        nut[i].color[2] = 1;
        }
        nut[i].color[0] += 1;
        nut[i].color[1] += 1;
        nut[i].color[2] += 1;
        nut[i].root.style.backgroundColor = `rgba(${nut[i].color[0]}, ${nut[i].color[1]}, ${nut[i].color[2]})`;
    }
    // SIMULATION BOUNDARIES
    let boundaryInterval = setInterval(() => {nutBoundary();}, time);
    let nutLeftNum = [];
    let nutTopNum = [];
    function nutBoundary() {
        //SCENE WALL
        nutLeftNum[i] = (parseFloat(nut[i].root.style.left, 10))*width/100;
        nutTopNum[i] = (parseFloat(nut[i].root.style.top, 10))*height/100;
        if (nutLeftNum[i] >= (width - nut[i].size*1.7) || nutLeftNum[i] <= 0) {
            nut[i].vector[0] *= -1;
        } else if (nutTopNum[i] >= (height - nut[i].size*1.7) || nutTopNum[i] <= 0) {
            nut[i].vector[1] *= -1;
        } 
        // CELL BOUNDARIES
        if (nutLeftNum[i] >= width + 5 || nutLeftNum[i] <= -width - 5) {
            nut[i].root.style.left = ((nut[i].position[0] += (1 * nut[i].vector[0])) / nut[i].size) + '%';
            nut[i].root.style.top = ((nut[i].position[1] += (1 * nut[i].vector[1])) / nut[i].size) + '%';
            nut[i].position = [(Math.random()*100).toFixed(2) - 0, (Math.random()*100).toFixed(2) - 0];
        } else if (nutTopNum[i] >= height + 5 || nutTopNum[i] <= -height - 5) {
            nut[i].root.style.left = ((nut[i].position[0] += (1 * nut[i].vector[0])) / nut[i].size) + '%';
            nut[i].root.style.top = ((nut[i].position[1] += (1 * nut[i].vector[1])) / nut[i].size) + '%';
            nut[i].position = [(Math.random()*100).toFixed(2) - 0, (Math.random()*100).toFixed(2) - 0];
        }
    }
    section.append(nut[i].root);
    // NUT PHYSICS: COLLISION
    function detectCollision() {
        const ball1 = nut[i];
        for (let j = 0; j < nut.length; j++) {
            if (i !== j) {
                const ball2 = nut[j];
                const rect1 = ball1.root.getBoundingClientRect();
                const rect2 = ball2.root.getBoundingClientRect();
                if (rect1.left < rect2.right && rect1.right > rect2.left && rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
                    ball1.vector[0] *= -1;
                    ball1.vector[1] *= -1;
                    ball2.vector[0] *= -1;
                    ball2.vector[1] *= -1;
                    // gravityLocal();
                    // gravityCentral();
                    // physicsFusion(j);
                    // physicsFission(j);
                }
            }
        }
    }
    // NUT GRAVITY: LOCALIZED [PLANNED]
    // NUT GRAVITY: CENTRALIZED [PLANNED]
    // NUT PHYSICS: FUSION
    function physicsFusion(j) {
        nut[i].size += (nut[j].size/6);
        nut[i].root.style.width = `${nut[i].size*50}px`;
        nut[i].root.style.height = `${nut[i].size*50}px`;
        nut[i].root.style.clipPath = `circle(${nut[i].size*25}px at ${nut[i].size*25}px ${nut[i].size*25}px)`;
        if (i !== j) {
            nut[j].root.remove();
        }
    }
    // NUT PHYSICS: FISSION [PLANNED]
}