let grid;
let score = 0;

function setup(){
  createCanvas(400,400);
  noLoop();
  grid = blankGrid();
  addNumber();
  addNumber();
  updateCanvas();
}

function keyPressed() {
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
    for (let i = 0; i < 4; i++) {
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
    console.log("Game Over");
  }
  let gameWon = isGameWon();
  if (gameWon) {
    console.log("Game Won")
  }
}

function updateCanvas() {
  background(255);
  drawGrid();
  select("#score").html(score)
}

function drawGrid() {
  let w = 100;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      noFill();
      strokeWeight(2);
      let val = grid[i][j]
      let s = val.toString();
      stroke(0);
      if (val != 0) {
        fill(colorsSizes[s].color);
      }else{
        noFill();
      }
      rect(i*w,j*w,w,w);
      if (grid[i][j] !== 0) {
        textAlign(CENTER,CENTER);
        noStroke();
        fill(0);
        textSize(colorsSizes[s].size);
        text(val, i * w + w / 2, j * w + w / 2);
      }
    }
  }
}

setup()
