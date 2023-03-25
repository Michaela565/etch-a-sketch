const container = document.querySelector('.grid-container');



function makeGrid(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (let i = 0; i < rows*cols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        container.appendChild(cell);
    }
}

function addMouseDownEventListeners(){
    const divs = document.querySelectorAll('.grid-cell');
    divs.forEach((div) => {
        // and for each one we add a 'click' listener
        div.addEventListener('mousedown', addMouseOverEventListeners);
        div.addEventListener('mouseup', removeMouseOverEventListeners())
      });
}

function removeMouseOverEventListeners(e){
    const divs = document.querySelectorAll('.grid-cell');
    divs.forEach((div) => {
        //div.removeEventListener('mouseover', drawWithBlack(div));
      });
}

function drawWithBlack(e){
    e.target.style.cssText = "background-color:black;";
}

function addMouseOverEventListeners(e) {
    e.target.addEventListener('mouseover', drawWithBlack);
}

makeGrid(32,32);
addMouseDownEventListeners();