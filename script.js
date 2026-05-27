const board=document.querySelector('.board');

const score=document.querySelector('#score');

score.innerText=0;

const blockHeight=50;
const blockWidth=50;

const  cols=Math.floor(board.clientWidth/blockWidth);
const  rows=Math.floor(board.clientHeight/blockHeight);

let direction= "down";

let intervalid=null;

const blocks=[];
const snake=[{x:1 , y:3}];

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

function render(){
    blocks[`${snake[0].x}-${snake[0].y}`].classList.remove("headcolor")
    let head=null;
    let a =food.x;
    let b=food.y;
    // blocks[`${a}-${b}`].classList.add("food");
    blocks[`${a}-${b}`].innerHTML='<img src="apple2.jpg" style="width:50px; height:50px;"></img>';

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

    if(head.x<0 || head.x>rows || head.y<0 || head.y>cols){
        alert("game over")
        clearInterval(intervalid);
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
        score.innerText++;

        snake.unshift(head);
    }

    
}

intervalid=setInterval(() => {
    render();
}, 200); // in settimeout and set interval time is given in ms

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