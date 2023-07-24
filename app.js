const grid = document.querySelector(".grid");
const scoreDisplay =document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const userStart = [230, 10];
let currentPosition = userStart;
let timerId;
let xDirection = -2;
let yDirection = 2;
let score = 0 ;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;
// Create Block
class Block {
  constructor(xAxis, yAxis) {
    this.bootomLeft = [xAxis, yAxis];
    this.bootomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    // console.log(this);
  }
}
//  ALL my blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];
// console.log(blocks[1]);

// draw my blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bootomLeft[0] + "px";
    block.style.bottom = blocks[i].bootomLeft[1] + "px";
    grid.appendChild(block);
  }
}
addBlocks();

//  Add user
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);


//  draw the User
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}


// draw ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
console.log(ballCurrentPosition[0],ballCurrentPosition[1]);
}


// Move User
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      // console.log(currentPosition[0]);
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      // console.log(currentPosition[0]);
      break;
  }
}

document.addEventListener("keydown", moveUser);

// Add Ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

// move ball

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
    // console.log(ballCurrentPosition[0],ballCurrentPosition[1])
  
  drawBall();
  checkForCollision();
}
timerId = setInterval(moveBall, 30);



// check for coolisions
function checkForCollision() {
  // check for block collision
for (let i=0; i < blocks.length; i++){
  if(
   ( ballCurrentPosition[0] > blocks[i].bootomLeft[0] && ballCurrentPosition[0] < blocks[i].bootomRight[0]) && ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bootomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
  ){
    console.log("////////////////////////////////////////////");
    console.log("checking when ball collides with blocks");
    console.log(ballCurrentPosition[0],blocks[i].bootomLeft[0]);
    console.log(ballCurrentPosition[0],blocks[i].bootomRight[0]);
    console.log(ballCurrentPosition[1] + ballDiameter,blocks[i].bootomLeft[1]);
    console.log(ballCurrentPosition[1],blocks[i].topLeft[1]);
    console.log("////////////////////////////////////////////");
    const allBlocks =Array.from(document.querySelectorAll(".block"));
    allBlocks[i].classList.remove("block");
    blocks.splice(i,1);
    changeDirection()
    score++;
    scoreDisplay.innerHTML= score;
// check for win 
    if(blocks.length === 0){
      scoreDisplay.innerHTML = "YOU WIN";
      clearInterval(timerId);
      document.removeEventListener("keydown" , moveUser)

        }

  }
}

  //  check for wall collision
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= (boardHeight - ballDiameter) || ballCurrentPosition[0] <= 0
  ) {
    console.log(ballCurrentPosition[0],ballCurrentPosition[1],"inside check for wallcollision first if")
    changeDirection();

  }
  // check for user collision
  if(
    (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
    (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)  
    ){
      console.log("chek for userBlock collision with Ball")
      console.log(ballCurrentPosition[0],currentPosition[0])
      console.log(ballCurrentPosition[0],currentPosition[0] + blockWidth)
      console.log(ballCurrentPosition[1],currentPosition[1])
      console.log(ballCurrentPosition[1],currentPosition[1] + blockHeight)
      changeDirection();
    }


  //  check for game over
  if(ballCurrentPosition[1] <= 0){
    clearInterval(timerId);
    scoreDisplay.innerHTML = "you lose";
    document.removeEventListener("keydown", moveUser);
    // console.log(ballCurrentPosition[0],ballCurrentPosition[1],"inside check for game over collision second if");
  }
}


// change Direction
function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    console.log(ballCurrentPosition[0],ballCurrentPosition[1],"inside change direction first if")
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    console.log(ballCurrentPosition[0],ballCurrentPosition[1],"inside change direction second if")
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    console.log(ballCurrentPosition[0],ballCurrentPosition[1],"inside change direction third if")
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    console.log(ballCurrentPosition[0],ballCurrentPosition[1],"inside change direction fourth if")
    return;
  }
}


