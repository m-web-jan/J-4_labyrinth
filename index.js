var ground = document.getElementsByTagName("canvas")[0].getContext("2d");
ground.canvas.width = 500;
ground.canvas.height = 500;
var finish = document.createElement("img");
finish.src = "img/finish.png";
var mc = document.createElement("img");
mc.src = "img/mc.png";
finish.addEventListener("load", function () {
  drawFinish();
});
mc.addEventListener("load", function () {
  resetProp();
  drawGround();
  drawMacLeod();
  drawFinish();
  document.getElementsByTagName("button")[1].onclick = () => {
    generateLevel();
  };
});
var blocks = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
let saveBtn = document.getElementsByTagName('button')[0];
let inputWidth = document.getElementsByTagName('input')[0];
let inputHeight = document.getElementsByTagName('input')[1];
let width = 8;
let height = 8;
let levelNum = 1;
function generateLevel() {
    levelNum = 0;
    let newBlock = [];
    for (let x = 0; x<height; x++) {
        let row = [];
        for (let y = 0; y<width; y++) {
            row.push(0);
        }
        newBlock[x] = row;
    }
    blocks = newBlock;
    addLevel();
    resetProp();
    drawGround();
    drawMacLeod();
    drawFinish();
    levelNum = 1;
}
saveBtn.onclick = () => {
    width = parseInt(inputWidth.value);
    height = parseInt(inputHeight.value);
    inputWidth.value = '';
    inputHeight.value = '';
    generateLevel()
}
let rnd1, rnd2;
function getRnd () {
    rnd1 = Math.floor(Math.random() * blocks.length);
    rnd2 = Math.floor(Math.random() * blocks[0].length);
}
function addLevel() {
    let a = true;
    while (a) {
        getRnd();
        if (rnd1==0 && rnd2==0) continue;
        if (blocks[rnd1][rnd2] == 1) continue;
        if (rnd1==blocks.length-1 && rnd2==blocks[0].length-1) continue;
        a = false;
    }
    blocks[rnd1][rnd2] = 1;
    levelNum++;
    document.getElementsByTagName('h2')[0].innerText = 'Уровень ' + levelNum;
}

var MacLeod = {};
document.body.addEventListener("keydown", animate);
function animate() {
  clearMacLeod();
  setProp();
  drawMacLeod();
  drawFinish();
}

function drawGround() {
  var blockWidth = MacLeod.width;
  var blockHeight = MacLeod.height;
  ground.fillStyle = "white";
  ground.fillRect(0, 0, ground.canvas.width, ground.canvas.height);
  for (let x = 0; x < blocks.length; x++) {
    for (let y = 0; y < blocks[x].length; y++) {
      if (blocks[x][y] !== 0) {
        ground.fillStyle = "black";
        ground.fillRect(
          y * blockWidth,
          x * blockHeight,
          blockWidth,
          blockHeight
        );
        ground.fillStyle = "red";
        ground.fillRect(
          y * blockWidth + blockWidth / 4,
          x * blockHeight + blockHeight / 4,
          blockWidth / 2,
          blockHeight / 2
        );
      }
    }
  }
}

function resetProp() {
  MacLeod.x = 0;
  MacLeod.y = 0;
  MacLeod.width = ground.canvas.width / blocks[0].length;
  MacLeod.height = ground.canvas.height / blocks.length;
}

function setProp() {
  switch (event.keyCode) {
    case 68:
      MacLeod.x++;
      if (getCollision()) generateLevel();
      break;
    case 65:
      MacLeod.x--;
      if (getCollision()) generateLevel();
      break;
    case 87:
      MacLeod.y--;
      if (getCollision()) generateLevel();
      break;
    case 83:
      MacLeod.y++;
      if (getCollision()) generateLevel();
      break;
  }
}

function drawMacLeod() {
  ground.drawImage(
    mc,
    0,
    0,
    100,
    100,
    MacLeod.x * MacLeod.width,
    MacLeod.y * MacLeod.height,
    MacLeod.width,
    MacLeod.height
  );
}
function drawFinish() {
  ground.drawImage(
    finish,
    0,
    0,
    100,
    100,
    ground.canvas.width - MacLeod.width,
    ground.canvas.height - MacLeod.height,
    MacLeod.width,
    MacLeod.height
  );
}

function clearMacLeod() {
  ground.fillStyle = "white";
  ground.fillRect(
    MacLeod.x * MacLeod.width,
    MacLeod.y * MacLeod.height,
    MacLeod.width,
    MacLeod.height
  );
}

function getCollision() {
  if (MacLeod.x === blocks[0].length - 1 && MacLeod.y === blocks.length - 1) {
    addLevel();
    resetProp();
    drawGround();
  }
  if (
    MacLeod.x < 0 ||
    MacLeod.x > blocks[0].length - 1 ||
    MacLeod.y < 0 ||
    MacLeod.y > blocks.length - 1 ||
    blocks[MacLeod.y][MacLeod.x] === 1
  ) {
    return true;
  }
  return false;
}