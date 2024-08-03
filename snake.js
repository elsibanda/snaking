const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const restartBTN = document.querySelector("#restartBTN");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardbackground = "aquamarine";
const snakeColor = "Purple";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX ;
let foodY;
let score =0;
let snake = [
    {x:unitSize *4, y:0},
    {x:unitSize *3, y:0},
    {x:unitSize *2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0},
];

window.addEventListener("keydown", changeDirection);
restartBTN.addEventListener("click", restartGame);

gameStart();

function gameStart(){
  running = true;
  scoreText.textContent=score;
  createFood();
  drawFood();
  nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 100);

    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardbackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min,max){
        const randNum =Math.round((Math.random()*(max - min)+ min)/unitSize)*unitSize; 
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);

};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX,foodY, unitSize, unitSize);
};
function moveSnake(){
    const head = {x:snake[0].x+xVelocity,
                  y:snake[0].y+yVelocity};

    snake.unshift(head);
    if (snake[0].x ==foodX && snake[0].y ==foodY){
         score+=1;
         scoreText.textContent = score
         createFood();
    }   
    else {
        snake.pop();
    }         
};
/*function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakepart => {
      ctx.fillRect(snakepart.x, snakepart.y, unitSize, unitSize);
      ctx.strokeRect(snakepart.x, snakepart.y, unitSize, unitSize); 
    })
};*/
function drawSnake(){
    ctx.fillStyle = snakeColor;
    snake.forEach(snakepart => {
      ctx.fillRect(snakepart.x, snakepart.y, unitSize, unitSize);
    })
};
function changeDirection(event){
   const keydown = event.keyCode;
   const Left = 37;
   const Up =38;
   const Right =39;
   const Down = 40;


   const goingUp = (yVelocity == -unitSize);
   const goingDown = (yVelocity == unitSize);
   const goingRight = (xVelocity == unitSize);
   const goingLeft = (xVelocity == -unitSize);

   switch(true){
    case(keydown == Left && !goingRight):
    xVelocity = -unitSize;
    yVelocity = 0;
    break;
    case(keydown == Up && !goingDown):
    xVelocity = 0;
    yVelocity = -unitSize;
    break;
    case(keydown == Right && !goingLeft):
    xVelocity = unitSize;
    yVelocity = 0;
    break;
    case(keydown == Down && !goingUp):
    xVelocity = 0;
    yVelocity = unitSize;
    break;
    
   }

};
function checkGameOver(){
    switch(true){
        case(snake[0].x <0):
          running=false
          break;
        case(snake[0].x >= gameWidth):
          running=false
          break;
        case(snake[0].y <0):
          running=false
          break;
       case(snake[0].y >= gameHeight):
          running=false;
          break;
    }
    for(let i =1; i< snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running=false;
        }
    }
};
function displayGameOver(){
    ctx.font= "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", gameWidth/2, gameHeight/2);
     running=false;
    
};
function restartGame(){
    score=0;
    xVelocity=unitSize;
    yVelocity=0;
     snake = [
        {x:unitSize *4, y:0},
        {x:unitSize *3, y:0},
        {x:unitSize *2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0},
    ];
    gameStart();
};
