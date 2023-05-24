const section = document.querySelector('section');
const h1 = document.querySelector('h1');
const nut = [];
const nutCount = 60; //The # of nuts spawned. Higher #'s cause performance issues. Default: 15
const time = 10;
const speedBank = [[[], []], [[], []]];

for (let i = 0; i < nutCount; i++) {
    //NUT TIME DILATION [DEBUG TOOL]
    h1.addEventListener('click', (e) => {
        clearInterval(colorInterval);
        clearInterval(travelInterval);
        clearInterval(boundaryInterval);
    });
    //NUT GENESIS
    nut[i] = {
        root: document.createElement('div'),
        size: 1, //Changes size of nuts. Recommended 0.75-2.0. Default: 1
        color: [(Math.random()*255), (Math.random()*255), (Math.random()*255)],
        position: [(Math.random()*100).toFixed(2) - 0, (Math.random()*100).toFixed(2) - 0],
        vector: Math.random()*360
    };
    //NUT ATTRIBUTE REASSIGNMENT
    nut[i].vector = [Math.cos(nut[i].vector), Math.sin(nut[i].vector)];
    //NUT INITIAL COMPILATION
    nut[i].root.style.width = `${nut[i].size*50}px`;
    nut[i].root.style.height = `${nut[i].size*50}px`;
    nut[i].root.style.clipPath = `circle(${nut[i].size*25}px at ${nut[i].size*25}px ${nut[i].size*25}px)`;
    nut[i].root.style.backgroundColor = `rgba(${nut[i].color[0]}, ${nut[i].color[1]}, ${nut[i].color[2]})`;
    nut[i].root.style.left = nut[i].position[0] + '%';
    nut[i].root.style.top = nut[i].position[1] + '%';
    //NUT SPEED [INCOMPLETE]
    let travelInterval = setInterval(() => {nutTravel();}, time);
    function nutTravel() {  
        nut[i].root.style.left = ((nut[i].position[0] += (1 * nut[i].vector[0])) / nut[i].size) + '%';
        nut[i].root.style.top = ((nut[i].position[1] += (1 * nut[i].vector[1])) / nut[i].size) + '%';
        detectCollision();
    }
    //NUT COLOR SHIFT
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
    //NUT RADIANCE [PLANNED]
    //NUT PHYSICS I: BOUNDARIES [BUGGED]
    let boundaryInterval = setInterval(() => {nutBoundary();}, time);
    let nutLeftNum = [];
    let nutTopNum = [];
    function nutBoundary() {
        //SCENE WALL
        nutLeftNum[i] = (parseInt(nut[i].root.style.left, time));
        nutTopNum[i] = (parseInt(nut[i].root.style.top, time));
        if (nutLeftNum[i] >= (100 - nut[i].size*1.7) || nutLeftNum[i] <= 0) {
            nut[i].vector[0] *= -1;
        } else if (nutTopNum[i] >= (100 - nut[i].size*1.7) || nutTopNum[i] <= 0) {
            nut[i].vector[1] *= -1;
        } 
        //CELL BOUNDARIES
        if (nutLeftNum[i] >= 105 || nutLeftNum[i] <= -105) {
            nut[i].root.style.left = ((nut[i].position[0] += (1 * nut[i].vector[0])) / nut[i].size) + '%';
            nut[i].root.style.top = ((nut[i].position[1] += (1 * nut[i].vector[1])) / nut[i].size) + '%';
            nut[i].position = [(Math.random()*100).toFixed(2) - 0, (Math.random()*100).toFixed(2) - 0];
        } else if (nutTopNum[i] >= 105 || nutTopNum[i] <= -105) {
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
                    // gravityPhysics(j);
                    fusionPhysics(j);
                    // fissionPhysics(j);
                }
            }
        }
    }
    //NUT PHYSICS II: GRAVITY
    //NUT PHYSICS III: FUSION
    function fusionPhysics(j) {
        nut[i].size += (nut[j].size/6);
        nut[i].root.style.width = `${nut[i].size*50}px`;
        nut[i].root.style.height = `${nut[i].size*50}px`;
        nut[i].root.style.clipPath = `circle(${nut[i].size*25}px at ${nut[i].size*25}px ${nut[i].size*25}px)`;
        if (i !== j) {
            nut[j].root.remove();
        }
    }
    //NUT PHYSICS IV: FISSION [PLANNED]
}