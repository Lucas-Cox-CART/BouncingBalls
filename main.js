const section = document.querySelector('section');
const h1 = document.querySelector('h1');
const nut = [];

for (let i = 0; i < 10; i++) {
  //NUT TIME DILATION [DEBUG TOOL]
  h1.addEventListener('click', (e) => {
    clearInterval(colorInterval);
    clearInterval(travelInterval);
    clearInterval(boundaryInterval);
  });
  //NUT GENESIS
  nut[i] = {
    root: document.createElement('div'),
    color: [(Math.random()*255), (Math.random()*255), (Math.random()*255)],
    position: [(Math.random()*100).toFixed(2) - 0, (Math.random()*100).toFixed(2) - 0],
    direction: [(Math.round(Math.random())), (Math.round(Math.random()))],
    speed: null
  };
  //NUT FALSE CONVERSION
  if (nut[i].direction[0] == 0) {
    nut[i].direction[0] = -1;
  } else if (nut[i].direction[1] == 0) {
    nut[i].direction[1] = -1;
  }
  //NUT INITIAL COMPILATION
  nut[i].root.style.backgroundColor = `rgba(${nut[i].color[0]}, ${nut[i].color[1]}, ${nut[i].color[2]})`;
  nut[i].root.style.left = nut[i].position[0] + '%';
  nut[i].root.style.top = nut[i].position[1] + '%';
  //NUT SPEED [INCOMPLETE]
  let travelInterval = setInterval(() => {nutTravel();}, 10)
  function nutTravel() {  
    nut[i].root.style.left = (nut[i].position[0] += nut[i].direction[0]) + '%';
    nut[i].root.style.top = (nut[i].position[1] += nut[i].direction[1]) + '%';
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
    if (nutLeftNum[i] >= 100 || nutLeftNum[i] <= 0) {
      nut[i].direction[0] *= -1;
    } else if (nutTopNum[i] >= 100 || nutTopNum[i] <= 0) {
      nut[i].direction[1] *= -1;
    }
  }
  //NUT PHYSICS II: COLLISIONS [HIGH-PRIORITY, PLANNED]
  setInterval(() => {checkForCollision();}, 10);
  function checkForCollision() {

  }
  //NUT PHYSICS III: GRAVITY [LOW-PRORITY, PLANNED]
  //NUT CHEMISTRY I: FUSION [PLANNED]
  //NUT CHEMISTRY II: FISSION [PLANNED]
  section.append(nut[i].root);
}