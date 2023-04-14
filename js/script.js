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
let shouldFill = false;
let userColor = "";
let cellCount = 0;
let gridSize = 0;
let currentColor = "";
let currentBackgroundColor = "";

// Gets the color from the color picker
function update(picker) {
    userColor = picker.toRGBString();
    currentColor = userColor;
    blackColor = randomColor = erase = shouldFill = false;
}

function generateNewGrid() {
    let cells = document.querySelectorAll('.grid-cell');
    cells.forEach((cell) => {
        cell.remove();
    });
    cellCount = 0;
    makeGrid(slider.value , slider.value);
}

function makeGrid(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    container.style.setProperty('--grid-cell', SQUAREWH/rows + "px");
    gridSize = parseInt(rows);
    for (let i = 0; i < rows*cols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.id = i+1;
        cellCount ++;
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

function convertToRGB(rbg){
    return rbg.replace(/\s/g, '');
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
        case shouldFill:
            fill(parseInt(e.target.id), convertToRGB(e.target.style.backgroundColor), currentColor);
            break;
        default:
            userPickedColor(e);
            break;
    }
}

// Switches to the right color input based on the input from buttons
function switchToAColorMode(e) {
    blackColor = randomColor = erase = shouldFill = false;
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
            shouldFill = true;
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
    currentColor = 'rgb(234,234,234)';
    e.target.style.background = 'rgb(234,234,234)';
}

function drawWithBlack(e) {
    currentColor = 'rgb(0,0,0)';
    e.target.style.background = 'rgb(0,0,0)';
}

function fill(position, prevColor, newColor){
    if(position <= 0 || position > cellCount)return;
    let bgColor = convertToRGB(document.getElementById(position.toString()).style.backgroundColor);
    if(bgColor != prevColor)return;
    if(bgColor == newColor)return;
    if(bgColor == prevColor){
        document.getElementById(position.toString()).style.backgroundColor = newColor;
    }
    fill(position+1, prevColor, newColor);
    fill(position-1, prevColor, newColor);
    fill(position+gridSize, prevColor, newColor);
    fill(position-gridSize, prevColor, newColor);

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