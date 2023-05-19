const section = document.querySelector('section');
let nut = [];
let color = [];
let rgba = [];

for (let i = 0; i < 10; i++) {
  //NUT CREATION
  nut[i] = {
    root: document.createElement('div'),
    red: (Math.random()*255),
    green: (Math.random()*255),
    blue: (Math.random()*255),
    left: (Math.random()*100) - 5,
    top: (Math.random()*100) - 5,
    directionX: (Math.round(Math.random())),
    directionY: (Math.round(Math.random()))
  };

  if (nut[i].directionX == 0) {
    nut[i].directionX = -0.5;
  } else if (nut[i].directionY == 0) {
    nut[i].directionY = -0.5;
  }

  rgba[i] = 'rgba(' + nut[i].red + ',' + nut[i].green + ',' + nut[i].blue + ')';
  nut[i].root.style.backgroundColor = rgba[i];
  nut[i].root.style.left = nut[i].left + '%';
  nut[i].root.style.top = nut[i].top + '%';
  //NUT COLOR TRANSITION
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
  }
  //NUT PHYSICS
  setInterval(() => {nutTravel()}, 16.67);
  function nutTravel() {
    nut[i].root.style.left = (nut[i].left += nut[i].directionX) + '%';
    nut[i].root.style.top = (nut[i].top += nut[i].directionY) + '%'
  }
  section.append(nut[i].root);
}