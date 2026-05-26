const board=document.querySelector('.board');

const blockHeight=50;
const blockWidth=50;

const  cols=Math.floor(board.clientWidth/blockWidth);
const  rows=Math.floor(board.clientHeight/blockHeight);

let direction= "down";

let intervalid=null;

const blocks=[];
const snake=[{x:1 , y:3}];

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const block = document.createElement('div');
        block.classList.add("block");
        board.append(block);
        block.innerText=`${i}-${j}`;
        blocks[`${i}-${j}`]=block;
        
        
    }
    
}

function render(){
    snake.forEach(segment => {
            blocks[`${segment.x}-${segment.y}`].classList.add("fill") ;//for each is used for applying functions to elements of array
    }

    )
}

intervalid=setInterval(() => {

    let head=null;

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
    snake.pop();


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