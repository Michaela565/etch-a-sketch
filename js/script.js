const container = document.querySelector('.grid-container');
const randomButton = document.querySelector('.random');
const bwButton = document.querySelector('.bw');
const eraseButton = document.querySelector('.eraser');
const userPickButton = document.querySelector('.user-color');
const slider = document.querySelector('.slider');
let randomColor = false;
let blackColor = true;
let erase = false;
let userColor = "";

function update(picker) {
    userColor = picker.toRGBString();
}

function generateNewGrid() {
    let cells = document.querySelectorAll('.grid-cell');
    cells.forEach((cell) => {
        cell.remove();
    });
    makeGrid(slider.value, slider.value);
}

function makeGrid(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (let i = 0; i < rows*cols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        container.appendChild(cell);
    }
    addMouseDownEventListeners();
}

function addButtonListeners() {
    randomButton.addEventListener('click', switchToAColorMode);
    bwButton.addEventListener('click', switchToAColorMode);
    eraseButton.addEventListener('click', switchToAColorMode);
    userPickButton.addEventListener('click', switchToAColorMode);
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
    if (blackColor){
        drawWithBlack(e)
    }
    else if (randomColor){
        drawWithRandom(e);
    }
    else if (erase){
        eraser(e);
    }
    else{
        userPickedColor(e);
    }
}

function switchToAColorMode(e){
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
            break;
        case userPickButton:
            blackColor = false;
            randomColor = false;
            erase = false;
            break;
    }
}

function userPickedColor(e){
    e.target.style.background = userColor;
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
    makeGrid(slider.value,slider.value);
    addButtonListeners();
}
main();