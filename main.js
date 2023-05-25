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
let nutCountNumber = document.getElementById('nutCountNumber');
nutCountNumber.addEventListener('change', (e) => {
    nutCountNumber = document.getElementById('nutCountNumber').value;
    if (nutCountNumber < 0) {
        document.getElementById('alert').innerText += `\n\n${dateTime}` + " Can't have negative nuts!";
        nutCount = 0;
        document.getElementById('nutCountNumber').value = "0";
    } else if (nutCountNumber != parseInt(nutCountNumber)) {
        document.getElementById('alert').innerText += `\n\n${dateTime}` + " Can only accept integers. Rounded to nearest value.";
        nutCount = Math.round(nutCountNumber);
        document.getElementById('nutCountNumber').value = `${nutCount}`;
    }
});

// BEHIND-THE-SCENES
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
    // NUT RADIANCE [PLANNED]
    // NUT PHYSICS I: BOUNDARIES
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
                    // gravityPhysics();
                    // fusionPhysics(j);
                    // fissionPhysics(j);
                }
            }
        }
    }
    // NUT PHYSICS II: GRAVITY [PLANNED]
    // NUT PHYSICS III: FUSION
    function fusionPhysics(j) {
        nut[i].size += (nut[j].size/6);
        nut[i].root.style.width = `${nut[i].size*50}px`;
        nut[i].root.style.height = `${nut[i].size*50}px`;
        nut[i].root.style.clipPath = `circle(${nut[i].size*25}px at ${nut[i].size*25}px ${nut[i].size*25}px)`;
        if (i !== j) {
            nut[j].root.remove();
        }
    }
    // NUT PHYSICS IV: FISSION [PLANNED]
}