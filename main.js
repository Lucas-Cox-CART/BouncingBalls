const section = document.querySelector('section');
const nut = [];
const color = [];
const rgba = [];

for (let i = 0; i < 10; i++) {
  //NUT GENESIS
  nut[i] = {
    root: document.createElement('div'),
    red: (Math.random()*255),
    green: (Math.random()*255),
    blue: (Math.random()*255),
    left: (Math.random()*100).toFixed(2) - 0,
    top: (Math.random()*100).toFixed(2) - 0,
    directionX: (Math.round(Math.random())),
    directionY: (Math.round(Math.random())),
    speed: null
  };
  //NUT FALSE CONVERSION
  if (nut[i].directionX == 0) {
    nut[i].directionX = -1;
  } else if (nut[i].directionY == 0) {
    nut[i].directionY = -1;
  }
  //NUT INITIAL COMPILATION
  rgba[i] = 'rgba(' + nut[i].red + ',' + nut[i].green + ',' + nut[i].blue + ')';
  nut[i].root.style.backgroundColor = rgba[i];
  nut[i].root.style.left = nut[i].left + '%';
  nut[i].root.style.top = nut[i].top + '%';
  //NUT PHASE SHIFT
  setInterval(() => {colorTransition();}, 10);
  function colorTransition() {
    if (nut[i].red >= 255) {
      nut[i].red = 1;
    } else if (nut[i].green >= 255) {
      nut[i].green = 1;
    } else if (nut[i].blue >= 255) {
      nut[i].blue = 1;
    }
    nut[i].red += 1;
    nut[i].green += 1;
    nut[i].blue += 1;
    rgba[i] = 'rgba(' + nut[i].red + ',' + nut[i].green + ',' + nut[i].blue + ')';
    nut[i].root.style.backgroundColor = rgba[i];
    nut[i].root.style.boxShadow = `20px solid ${rgba[i]})`;
  }
  //NUT RADIANCE [PLANNED]
  //NUT PHYSICS I: BOUNDARIES
  setInterval(() => {nutTravel();}, 10);
  function nutTravel() {
    let nutLeftNum = parseInt(nut[i].root.style.left, 10);
    let nutTopNum = parseInt(nut[i].root.style.top, 10);

    if (nutLeftNum >= 100) {
      nut[i].directionX *= -1;
    } else if (nutLeftNum <= 0) {
      nut[i].directionX *= -1;
    }
    if (nutTopNum >= 100) {
      nut[i].directionY *= -1;
    } else if (nutTopNum <= 0) {
      nut[i].directionY *= -1;
    }
    nut[i].root.style.left = (nut[i].left += nut[i].directionX) + '%';
    nut[i].root.style.top = (nut[i].top += nut[i].directionY) + '%';
  }
  //NUT PHYSICS II: COLLISIONS
  setInterval(() => {checkForCollision();}, 10);
  
  function checkForCollision() {
    for (let d = 1; d < 10; d++) {
      if (parseInt(nut[i].root.offsetTop, 10) - parseInt(nut[d].root.offsetTop, 10) < 50) {
        nut[i].directionY *= -1;
      } 
      
      if (parseInt(nut[i].root.offsetLeft, 10) - parseInt(nut[d].root.offsetLeft, 10) < 50) {
        nut[i].directionX *= -1;
      }
    }
  }
  //NUT PHYSICS III: FUSION [PLANNED]
  //NUT PHYSICS IV: FISSION [PLANNED]
  section.append(nut[i].root);
}