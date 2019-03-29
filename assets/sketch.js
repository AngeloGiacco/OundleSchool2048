let grid;
let img;
let score = 0;

function createText() {
  winText = createP('🎉🎉🎉 YOU GOT TO THE LEGENDARY LASHTUN TILE! YOU WIN! 🎉🎉🎉');
  winText.style('display', 'none');
  winText.style('color', 'red');
  winText.style('text-align', 'center');
  winText.position(width / 2, 240);
  lostText = createP("☠️☠️☠️You didn't reach the legendary tile...☠️☠️☠️");
  lostText.style('display', 'none');
  lostText.style('color', 'red');
  lostText.style('text-align', 'center');
  lostText.position(width / 2, 240);
}

function setup(){
  createCanvas(500,500);
  noLoop();
  grid = blankGrid();
  addNumber();
  addNumber();
  updateCanvas();
  createText()
}

function getMax(a){
  return Math.max(...a.map(e => Array.isArray(e) ? getMax(e) : e));
}

function checkLevel() {
  var level = "Level = ";
  max = getMax(grid);
  if (max > 4096) {
    level += "SKD";
  } else if (max > 1024) {
    level += "Mrs Watt";
  } else if (max > 256) {
    level += "Mr Langsdale";
  } else if (max > 64) {
    level += "Mrs Gascoine";
  } else if (max > 16) {
    level += "Mr Heath";
  }else {
    level += "Mr Ho";
  }
  return level;
}

function keyPressed() {
  if (!(isGameOver() || isGameWon())) {
    let flipped = false;
    let rotated = false;
    let played = true;
    if (keyCode === DOWN_ARROW) {
      //do nothing
    } else if (keyCode === UP_ARROW) {
      flipGrid(grid);
      flipped = true;
    } else if (keyCode === RIGHT_ARROW) {
      grid = rotateGrid(grid);
      rotated = true;
    } else if (keyCode === LEFT_ARROW) {
      grid = rotateGrid(grid);
      grid = flipGrid(grid);
      rotated = true;
      flipped = true;
    } else {
      played = false;
    }
    if (played) {
      let past = copyGrid(grid);
      for (let i = 0; i < 5; i++) {
        grid[i] = operate(grid[i]);
      }
      let changed = compare(past,grid);
      if (flipped) {
        flipGrid(grid);
      }

      if (rotated) {
        for (let i = 0; i < 3; i++) {
          grid  = rotateGrid(grid);
        }
      }

      if (changed) {
        addNumber();
      }
      updateCanvas();
    }

    let gameover = isGameOver();
    if (gameover) {
      lostText.style('display', 'block');
    }
    let gameWon = isGameWon();
    if (gameWon) {
      winText.style('display', 'block');
    }
  }
}

function updateCanvas() {
  background(255);
  drawGrid();
  select("#score").html(score);
  select("#level").html(checkLevel());
}

function drawGrid() {
  let w = 100;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      noFill();
      strokeWeight(2);
      let val = grid[i][j]
      let s = val.toString();
      stroke(0);
      rect(i*w,j*w,w,w);
      if (grid[i][j] !== 0) {
        textAlign(CENTER,CENTER);
        noStroke();
        fill(colorsSizes[s].color);
        textSize(20);
        text(colorsSizes[s].text, i * w + w / 2, j * w + w / 2);
      }
    }
  }
}
