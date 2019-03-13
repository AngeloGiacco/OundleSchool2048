let grid;
let score = 0;

function isGameOver() {
  let gameover = true;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 0) {
        return false;
      }
      if (j !== 3 && grid[i][j] === grid[i][j+1]) {
        return false;
      }
      if (i !==3 && grid[i][j] === grid[i+1][j]) {
        return false;
      }
    }
  }
  return true;
}

function blankGrid() {
  return [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
}

function setup(){
  createCanvas(400,400);
  noLoop();
  grid = blankGrid();
  addNumber();
  addNumber();
  updateCanvas();
}

function addNumber() {
  let options = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        options.push({
          x:i,
          y:j
        });
      }
    }
  }
  if (options.length > 0){
    let spot = random(options);
    let r = random(1);
    grid[spot.x][spot.y] = r > 0.5 ? 2 : 4;
  }
}

function copyGrid(grid) {
  let extra = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j<4;j++) {
      extra[i][j] = grid[i][j];
    }
  }
  return extra;
}

function compare(a,b) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (a[i][j] != b[i][j]) {
        return true;
      }
    }
  }
  return false;
}

function flipGrid(grid) {
  for (let i = 0; i < 4; i++) {
    grid[i].reverse();
  }
  return grid;
}

function rotateGrid(grid) {
  let newGrid  = blankGrid();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      newGrid[i][j] = grid[j][i];
    }
  }
  return newGrid;
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
}

function operate(row) {
  row = slide(row);
  row = combine(row);
  row = slide(row);
  return row;
}

function updateCanvas() {
  background(255);
  drawGrid();
  select("#score").html(score)
}

function slide(row) {
  let arr = row.filter(val => val);
  let missing = 4 - arr.length;
  let zeros = Array(missing).fill(0);
  arr = zeros.concat(arr);
  return arr;
}

function combine(row) {
  for (let i = 3; i >=1; i--) {
    let a = row[i]
    let b = row[i-1]
    if (a === b) {
      row[i] = a + b;
      score += row[i]
      row[i-1] = 0;
    }
  }
  return row;
}

function drawGrid() {
  let w = 100;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      noFill();
      strokeWeight(2);
      stroke(0);
      rect(i*w,j*w,w,w);
      if (grid[i][j] !== 0) {
        textAlign(CENTER,CENTER);
        fill(0);
        noStroke();
        let val = grid[i][j]
        let s = val.toString();
        let len = s.length;
        let sizes= [64,64,32,16]
        textSize(sizes[len-1]);
        text(val, i * w + w / 2, j * w + w / 2);
      }
    }
  }
}

setup()
