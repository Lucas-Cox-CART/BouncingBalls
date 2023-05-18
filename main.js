const section = document.querySelector('section');
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

const colorStore = ['null', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white', 'gray', 'brown', 'pink'];

let nut = [];
let colorPointer = [];
let positionHeight = [];
let positionWidth = [];
let vectorMatrix = [[], [], []];
// [Speed], [Pos/Neg Height Delta], [Pos/Neg Width Delta]

for (let i = 0; i < 30; i++) {
  //NUT CREATION
  nut[i] = document.createElement('div');
  nut[i].classList.add('nut');
  section.append(nut[i]);
  function somethingCool() {
    for (let i = 0; i < 30; i++) {
      //NUT STYLE
      colorPointer[i] = (Math.round(Math.random() * 15));
      nut[i].style.backgroundColor = colorStore[colorPointer[i]];
      //NUT POSITION
      positionHeight[i] = (Math.random() * 100);
      positionWidth[i] = (Math.random() * 100);
      nut[i].style.left = positionWidth[i] + "%";
      nut[i].style.top = positionHeight[i] + "%";
    }
  }
}

setInterval(() => {
  somethingCool();
}, 10);