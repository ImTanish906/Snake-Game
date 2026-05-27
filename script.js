const board=document.querySelector('.board');
const startbtn = document.querySelector(".btn-start");
const highscoredv=document.querySelector("#high-score");
const timedv=document.querySelector("#time")

const scoredv=document.querySelector('#score');
const startgame=document.querySelector(".start-game");
const restartgame=document.querySelector(".game-over");

const restartbutton=document.querySelector(".btn-restart");


const modal=document.querySelector('.modal');
let highscore=localStorage.getItem("highscore")||0;
scoredv.innerText=0;
highscoredv.innerText=highscore;
timedv.innerText="00:00";



let score=0;

let time="00:00";


const blockHeight=50;
const blockWidth=50;

const  cols=Math.floor(board.clientWidth/blockWidth);
const  rows=Math.floor(board.clientHeight/blockHeight);

let direction= "down";

let intervalid=null;
let timerintervalid=null;

const blocks=[];
let snake=[{x:1 , y:3}];

let food={
    x:Math.floor(Math.random()*rows),
    y:Math.floor(Math.random()*cols) //math.random generates a random number between 0 and 1
}

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const block = document.createElement('div');
        block.classList.add("block");
        board.append(block);
        // block.innerText=`${i}-${j}`;
        blocks[`${i}-${j}`]=block;
        
        
    }
    
}

function restart(){

}

function render(){
    blocks[`${snake[0].x}-${snake[0].y}`].classList.remove("headcolor")
    let head=null;
    let a =food.x;
    let b=food.y;
    // blocks[`${a}-${b}`].classList.add("food");
    blocks[`${a}-${b}`].innerHTML='<img src="apple2.jpg" style="width:40px; height:40px;"></img>';

    if(direction == "right"){
        head={ x:snake[0].x,y:(snake[0].y)+1};
    }
    else if(direction == "left"){
         head={ x:snake[0].x,y:(snake[0].y)-1};
    }
    else if(direction == "up"){
         head={ x:snake[0].x-1,y:(snake[0].y)};
    }
    else if(direction == "down"){
         head={ x:snake[0].x+1,y:(snake[0].y)};
    }

    if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){

    modal.style.display = "flex"; // SHOW MODAL AGAIN

    restartgame.style.display = "flex";
    startgame.style.display = "none";

    clearInterval(intervalid);

    return;
}
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill") ;

        
    });
    snake.unshift(head);
    blocks[`${snake[0].x}-${snake[0].y}`].classList.add("headcolor");
    snake.pop();

    

    snake.forEach(segment => {
            blocks[`${segment.x}-${segment.y}`].classList.add("fill") ;//for each is used for applying functions to elements of array
    }
)


    if(a==head.x && b==head.y){
        // blocks[`${a}-${b}`].classList.remove("food");
            blocks[`${a}-${b}`].innerHTML='';

        food.x=Math.floor(Math.random()*rows);
        food.y=Math.floor(Math.random()*cols);
        score+=10;
        scoredv.innerText=score;
        if (score>highscore) {
            highscore=score;
            highscoredv.innerText = highscore;

            localStorage.setItem("highscore",highscore.toString())

            
        }

        snake.unshift(head);
    }

    
}

// intervalid=setInterval(() => {
//     render();
// }, 200); 

addEventListener("keydown",(event)=>{
    console.log(event.key);
    if(event.key=="ArrowUp"){
        direction="up";
    }
    else if(event.key=="ArrowDown"){
        direction="down";
    }
    else if(event.key=="ArrowRight"){
        direction="right";
    }
    else if(event.key=="ArrowLeft"){
        direction="left";
    }
})

startbtn.addEventListener("click",(event)=>{

    modal.style.display="none";
    intervalid=setInterval(() => {
        render()
        
    }, 200);
    
    timerintervalid=setInterval(()=>{
        let [min,sec]=time.split(":").map(Number);

        if(sec==59){
            min++;
            sec=0;
        }
        else{
            sec++;
        }

        time=`${min}:${sec}`;
        timedv.innerText=time;

    },1000)// in settimeout and set interval time is given in ms
})


function restartgamefnc(){
    scoredv.innerText=0;
    score=0;
    modal.style.display="none";
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
        blocks[`${segment.x}-${segment.y}`].classList.remove("headcolor");
    });
    time="00:00";

    blocks[`${food.x}-${food.y}`].innerHTML='';

    direction = "down";

    snake=[{x:1 , y:3}];
    food={
    x:Math.floor(Math.random()*rows),
    y:Math.floor(Math.random()*cols)
    } //math.random generates a random number between 0 and 1
    intervalid=setInterval(() => {
        render()
        
    }, 200);

}


restartbutton.addEventListener("click",(event)=>{
    restartgamefnc();

})

