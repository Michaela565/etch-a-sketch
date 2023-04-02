const container = document.querySelector('.grid-container');
const randomButton = document.querySelector('.random');
const bwButton = document.querySelector('.bw');
const eraseButton = document.querySelector('.eraser');
let randomColor = false;
let blackColor = true;
let erase = false;

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
    randomButton.addEventListener('click', switchToAColorMode);
    bwButton.addEventListener('click', switchToAColorMode);
    eraseButton.addEventListener('click', switchToAColorMode);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function pickAColorMode(e){
    console.log(blackColor, randomColor, erase);
    if (blackColor){
        console.log('black');
        drawWithBlack(e)
    }
    else if (randomColor){
        console.log('random');
        drawWithRandom(e);
    }
    else if (erase){
        console.log('white');
        eraser(e);
    }
}

function switchToAColorMode(e){
    console.log(e.target);
    switch(e.target){
        case bwButton:
            blackColor = true;
            randomColor = false;
            erase = false;
            break;
        case randomButton:
            randomColor = true;
            blackColor = false;
            erase = false;
            break;
        case eraseButton:
            blackColor = false;
            randomColor = false;
            erase = true;
    }
}

function drawWithRandom(e){
    e.target.style.background = getRandomColor();
}

function eraser(e){
    e.target.style.background = '#EAEAEA';
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
        div.removeEventListener('mouseover', pickAColorMode);
        div.removeEventListener('click', removeMouseOverEventListeners);
        div.addEventListener('click', addMouseDownEventListeners);
      });
}

function addMouseOverEventListeners() {
    const divs = document.querySelectorAll('.grid-cell');

    divs.forEach((div) => {
        div.removeEventListener('click', addMouseOverEventListeners);
        div.addEventListener('mouseover',pickAColorMode);
        div.addEventListener('click', removeMouseOverEventListeners);
      });
    
}

function main(){
    makeGrid(32,32);
    addMouseDownEventListeners();
    addButtonListeners();
}
main();