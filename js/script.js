const container = document.querySelector('.grid-container');
const randomButton = document.querySelector('.random');
const bwButton = document.querySelector('.bw');
const eraseButton = document.querySelector('.eraser');
let randomColor = false;
let blackColor = true;
let erase = () => {
    if (blackColor == false && randomColor == false){
        return true;
    }
    else{
        return false;
    }
}

function makeGrid(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (let i = 0; i < rows*cols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        container.appendChild(cell);
    }
}

function addButtonListeners(){
    randomButton.addEventListener('click', pickAColorMode);
    bwButton.addEventListener('click', pickAColorMode);
    eraseButton.addEventListener('click', pickAColorMode);
}

function pickAColorMode(e){
    console.log(e.target);
}

function drawWithRandom(){

}

function eraser(){

}

function drawWithBlack(e){
    e.target.style.background = 'black';
}

function addMouseDownEventListeners(){
    const divs = document.querySelectorAll('.grid-cell');

    divs.forEach((div) => {
        div.addEventListener('click', addMouseOverEventListeners);
      });
}

function removeMouseOverEventListeners(){
    const divs = document.querySelectorAll('.grid-cell');

    divs.forEach((div) => {
        div.removeEventListener('mouseover', drawWithBlack);
        div.removeEventListener('click', removeMouseOverEventListeners);
        div.addEventListener('click', addMouseDownEventListeners);
      });
}

function addMouseOverEventListeners() {
    const divs = document.querySelectorAll('.grid-cell');

    divs.forEach((div) => {
        div.removeEventListener('click', addMouseOverEventListeners);
        div.addEventListener('mouseover',drawWithBlack);
        div.addEventListener('click', removeMouseOverEventListeners);
      });
    
}

function main(){
    makeGrid(32,32);
    addMouseDownEventListeners();
    addButtonListeners();
}
main();