const section = document.querySelector('section');
const h1 = document.querySelector('h1');
const nut = [];
const realPos = [[], []];
const speedBank = [[[], []], [[], []]];
const nutCount = 10;
const time = 30;

let width = window.innerWidth;
let height = window.innerHeight;

for (let i = 0; i < nutCount; i++) {
    //NUT GENESIS
    nut[i] = {
        root: document.createElement('div'),
        size: 1,
        position: [Math.random()*100, Math.random()*100],
        speed: [Math.random(), Math.random()],
    };
    //NUT ATTRIBUTE REASSIGNMENT
    nut[i].root.classList.add('test');
    // if (nut[i].direction[0] == 0) {
    //     nut[i].direction[0] = -1;
    // } else if (nut[i].direction[1] == 0) {
    //     nut[i].direction[1] = -1;
    // }
    section.append(nut[i].root);
}

for (let i = 0; i < nutCount; i++) {
    //NUT TIME DILATION [DEBUG TOOL]
    h1.addEventListener('click', (e) => {
        clearInterval(nutInterval);
    });

    //NUT MOVEMENT
    let nutInterval = setInterval(() => {nutMove(i);}, time);
    


    //NUT BOUNDARIES
    setInterval(() => {boundaryCross(i);}, time);
    
    //NUT PHYSICS II: GRAVITY [PLANNED]
    //NUT PHYSICS III: FUSION [PLANNED]
    //NUT PHYSICS IV: FISSION [PLANNED]
}

function nutMove(i) {
    nut[i].root.style.left = `${nut[i].position[0] += (nut[i].speed[0])}%`;
    nut[i].root.style.top = `${nut[i].position[1] += (nut[i].speed[1])}%`;
    detectCollision(i);
}

function boundaryCross(i) {
    if (realPos[0][i] >= width) {
        nut[i].speed[0] = Math.abs(nut[i].speed[0])*(-1);
        // console.log("ball"+i+"hit wall")
    } else if (realPos[1][i] >= height) {
        nut[i].speed[1] = Math.abs(nut[i].speed[1])*(-1);
        // console.log("ball"+i+"hit wall")
    } 
    if (realPos[0][i] <= 0) {
        nut[i].speed[0] = Math.abs(nut[i].speed[0]);
        // console.log("ball"+i+"hit wall")
    } else if (realPos[1][i] <= 0) {
        nut[i].speed[1] = Math.abs(nut[i].speed[1]);
        // console.log("ball"+i+"hit wall")
    } 
}

//NUT PHYSICS I: COLLISIONS
function detectCollision(i) {
    realPos[0][i] = parseFloat(nut[i].root.style.left)*width/100+25;
    realPos[1][i] = parseFloat(nut[i].root.style.top)*height/100+25;
    let speedCompare;
    for (let a = 0; a < nutCount; a++) {
        if(a!=i){
            speedBank[0][0][i] = nut[i].speed[0];
            speedBank[0][1][i] = nut[a].speed[0];
            speedBank[1][0][i] = nut[i].speed[1];
            speedBank[1][1][i] = nut[a].speed[1];
            
            realPos[0][a] = parseFloat(nut[a].root.style.left)*width/100+25;
            realPos[1][a] = parseFloat(nut[a].root.style.top)*height/100+25;
            
            if (nut[i].speed[0] > 0 && nut[a].speed[0] > 0 && nut[a] != nut[i]) {
                speedCompare = true;
            } else if (nut[i].speed[0] < 0 && nut[a].speed[0] < 0 && nut[a] != nut[i]) {
                speedCompare = true;
            } else {
                speedCompare = false;
            }
            
            if(Math.sqrt(((realPos[0][i]-realPos[0][a])**2)+((realPos[1][i]-realPos[0][a])**2))<nut[i].size*25+nut[a].size*25){
                console.log("is colide");
                // if (speedCompare == true) {
                //     if (nut[i].speed[0] > nut[a].speed[0]) {
                //         nut[i].speed[0] = -(nut[a].speed[0]);
                //         nut[a].speed[0] = speedBank[0][0][i];
                //     } else if (nut[a].speed[0] > nut[i].speed[0]) {
                //         nut[i].speed[0] = -(nut[a].speed[0]);
                //         nut[a].speed[0] = speedBank[0][0][i];
                //     }
                // } else if (speedCompare == false) {
                //     nut[i].speed[0] *= -1;
                // }
                nut[i].speed[0] *= -1;
                nut[i].speed[1] *= -1;
            }
            
            // if ((Math.abs(realPos[0][i] - realPos[0][a])) - 1.6 < 1.6 && realPos[0][i] != realPos[0][a]) {
            //     if ((Math.abs(realPos[1][i] - realPos[1][a])) - 1.6 < 1.6 && realPos[1][i] != realPos[1][a]) {
            //         if (speedCompare == true) {
            //             if (nut[i].speed[0] > nut[a].speed[0]) {
            //                 nut[i].speed[0] = -(nut[a].speed[0]);
            //                 nut[a].speed[0] = speedBank[0][0][i];
            //             } else if (nut[a].speed[0] > nut[i].speed[0]) {
            //                 nut[i].speed[0] = -(nut[a].speed[0]);
            //                 nut[a].speed[0] = speedBank[0][0][i];
            //             }
            //         } else if (speedCompare == false) {
            //             nut[i].speed[0] *= -1;
            //         }
            //     }
            // }
        }
    }
}
