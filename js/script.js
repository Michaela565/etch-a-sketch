const container = document.querySelector('.grid-container');
const randomButton = document.querySelector('.random');
const bwButton = document.querySelector('.bw');
const eraseButton = document.querySelector('.eraser');
const userPickButton = document.querySelector('.user-color');
const resetButton = document.querySelector('.reset');
const fillButton = document.querySelector('.fill');
const slider = document.querySelector('.slider');
const SQUAREWH = 512;

let randomColor = false;
let blackColor = true;
let erase = false;
let fill = false;
let userColor = "";

// Gets the color from the color picker
function update(picker) {
    userColor = picker.toRGBString();
    blackColor = false;
    randomColor = false;
    erase = false;
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
    container.style.setProperty('--grid-cell', SQUAREWH/rows + "px");
    for (let i = 0; i < rows*cols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        container.appendChild(cell);
    }
    addMouseDownEventListeners();
}

function addButtonListeners() {
    buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        button.addEventListener('click', switchToAColorMode);
    })
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function pickAColorMode(e) {
    switch (true) {
        case blackColor:
            drawWithBlack(e)
            break;
        case randomColor:
            drawWithRandom(e);
            break;
        case erase:
            eraser(e);
            break;
        default:
            userPickedColor(e);
            break;
    }
}

// Switches to the right color input based on the input from buttons
function switchToAColorMode(e) {
    blackColor = randomColor = erase = fill = false;
    switch(e.target){
        case bwButton:
            blackColor = true;
            break;
        case randomButton:
            randomColor = true;
            break;
        case eraseButton:
            erase = true;
            break;
        case fillButton:
            fill = true;
            break;
        case resetButton:
            generateNewGrid();
            break;
    }
}

function userPickedColor(e) {
    e.target.style.background = userColor;
}

function drawWithRandom(e) {
    e.target.style.background = getRandomColor();
}

function eraser(e) {
    e.target.style.background = '#EAEAEA';
}

function drawWithBlack(e) {
    e.target.style.background = 'black';
}

function addMouseDownEventListeners(){
    const divs = document.querySelectorAll('.grid-cell');

    divs.forEach((div) => {
        div.addEventListener('click', addMouseOverEventListeners);
      });
}

// The remover for mouseover and now useless click listener, adds a new one
function removeMouseOverEventListeners() {
    const divs = document.querySelectorAll('.grid-cell');

    divs.forEach((div) => {
        div.removeEventListener('mouseover', pickAColorMode);
        div.removeEventListener('click', removeMouseOverEventListeners);
        div.addEventListener('click', addMouseDownEventListeners);
      });
}

// Removes the old click event listener and puts on a new mouseover and click that removes off the mouseover listener
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