const board=document.querySelector('.board');

const blockHeight=50;
const blockWidth=50;

const  cols=Math.floor(board.clientWidth/blockWidth);
const  rows=Math.floor(board.clientHeight/blockHeight);

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
        console.log(segment);  //for each is used for applying functions to elements of array
    }

    )
}

