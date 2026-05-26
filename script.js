const board=document.querySelector('.board');

const blockHeight=50;
const blockWidth=50;

const  cols=Math.floor(board.clientWidth/blockWidth);
const  rows=Math.floor(board.clientHeight/blockHeight);

const direction= "right";

const blocks=[];
const snake=[{x:1 , y:3},{x:1 , y:4},{ x:1 , y:5}];

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

setInterval(() => {
    



    render();
}, 300); // in settimeout and set interval time is given in ms

