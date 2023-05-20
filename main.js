const section = document.querySelector('section');
const h1 = document.querySelector('h1');
const nut = [];
const nutCount = 10; //The # of nuts spawned. Higher #'s cause performance issues. Default: 10

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
    size: 1, //Changes size of nuts. Recommended 0.5-3.0. Default: 1
    color: [(Math.random()*255), (Math.random()*255), (Math.random()*255)],
    position: [(Math.random()*100).toFixed(2) - 0, (Math.random()*100).toFixed(2) - 0],
    vector: Math.random()*360,
  };
  //NUT ATTRIBUTE REASSIGNMENT
  nut[i].root.style.clipPath = `circle(${nut[i].size*25}px at ${nut[i].size*25}px ${nut[i].size*25}px)`;
  nut[i].root.style.width = `${nut[i].size*50}px`;
  nut[i].root.style.height = `${nut[i].size*50}px`;
  nut[i].vector = [Math.cos(nut[i].vector), Math.sin(nut[i].vector)];
  //NUT INITIAL COMPILATION
  nut[i].root.style.backgroundColor = `rgba(${nut[i].color[0]}, ${nut[i].color[1]}, ${nut[i].color[2]})`;
  nut[i].root.style.left = nut[i].position[0] + '%';
  nut[i].root.style.top = nut[i].position[1] + '%';
  //NUT SPEED [INCOMPLETE]
  let travelInterval = setInterval(() => {nutTravel();}, 10)
  function nutTravel() {  
    nut[i].root.style.left = (nut[i].position[0] += (1 * nut[i].vector[0])) + '%';
    nut[i].root.style.top = (nut[i].position[1] += (1 * nut[i].vector[1])) + '%';
  }
  //NUT PHASE SHIFT
  let colorInterval = setInterval(() => {colorTransition();}, 10);
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
  //NUT PHYSICS I: BOUNDARIES
  let boundaryInterval = setInterval(() => {nutBoundary();}, 10);
  let nutLeftNum = [];
  let nutTopNum = [];
  function nutBoundary() {
    nutLeftNum[i] = parseInt(nut[i].root.style.left, 10);
    nutTopNum[i] = parseInt(nut[i].root.style.top, 10);
    if (nutLeftNum[i] >= (100 - nut[i].size*1.7) || nutLeftNum[i] <= 0) {
      nut[i].vector[0] *= -1;
    } else if (nutTopNum[i] >= (100 - nut[i].size*1.7) || nutTopNum[i] <= 0) {
      nut[i].vector[1] *= -1;
    } else if (nutLeftNum[i] > 150 || nutLeftNum[i] < -150) {
      nut[i].root.style.left = 50 + '%';
      nut[i].root.style.top = 50 + '%';
    } else if (nutTopNum[i] > 150 || nutTopNum[i] < -150) {
      nut[i].root.style.left = 50 + '%';
      nut[i].root.style.top = 50 + '%';
    }
  }
  //NUT PHYSICS II: COLLISIONS [HIGH-PRIORITY, PLANNED] i'm going to go insane
  setInterval(() => {checkForCollision();}, 10);
  function checkForCollision() {
    for (let a = 1; a < nutCount; a++) {
      if (Math.abs(nutLeftNum[0] - nutLeftNum[a]) < 3) {
        nut[0].vector[0] *= -1;
        nut[a].vector[0] *= -1;
        console.log(`Collision! At A`);
      }
    }
    for (let b = 2; b < nutCount; b++) {
      if (Math.abs(nutLeftNum[1] - nutLeftNum[b]) < 3) {
        nut[1].vector[0] *= -1;
        nut[b].vector[0] *= -1;
        console.log(`Collision! At B}`);
      }
    }
  }
  //NUT PHYSICS III: GRAVITY [LOW-PRORITY, PLANNED]
  //NUT CHEMISTRY I: FUSION [PLANNED]
  //NUT CHEMISTRY II: FISSION [PLANNED]
  section.append(nut[i].root);
}