let grid;
let img;
let score = 0;

function setup(){
  createCanvas(500,500);
  noLoop();
  grid = blankGrid();
  addNumber();
  addNumber();
  updateCanvas();
}

function getMax(a){
  return Math.max(...a.map(e => Array.isArray(e) ? getMax(e) : e));
}

function checkLevel() {
  var level = "Level = ";
  max = getMax(grid);
  if (max > 4096) {
    level += "legendary";
  } else if (max > 1024) {
    level += "pro";
  } else if (max > 256) {
    level += "decent";
  } else if (max > 64) {
    level += "novice";
  }else {
    level += "noob";
  }
  return level;
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
    alert("You lost, lol, here is your punishment");
    window.location.href = "https://www.oundleschool.org.uk/MainFolder/oundle-school/pastoral/houses-and-hsm/laxtonhsm.JPG";
  }
  let gameWon = isGameWon();
  if (gameWon) {
    alert("You got to the LAXTON tile!!! You have won, here is your reward");
    window.location.href = "https://www.oundleschool.org.uk/MainFolder/oundle-school/pastoral/houses-and-hsm/schoolhouse_hsm.JPG";
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
