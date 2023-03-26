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
        div.addEventListener('click', addMouseOverEventListeners);
      });
}

function removeMouseOverEventListeners(){
    const divs = document.querySelectorAll('.grid-cell');
    console.log('i got up');
    divs.forEach((div) => {
        div.removeEventListener('mouseover', drawWithBlack);
        div.removeEventListener('click', removeMouseOverEventListeners);
        div.addEventListener('click', addMouseDownEventListeners);
      });
}

function drawWithBlack(e){
    e.target.style.background = 'black';
}

function addMouseOverEventListeners(e) {
    const divs = document.querySelectorAll('.grid-cell');

    divs.forEach((div) => {
        div.removeEventListener('click', addMouseOverEventListeners);
        div.addEventListener('mouseover',drawWithBlack);
        div.addEventListener('click', removeMouseOverEventListeners);
      });
    
}
makeGrid(32,32);
addMouseDownEventListeners();