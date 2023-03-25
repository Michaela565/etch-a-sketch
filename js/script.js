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

function addEventListeners(){
    const divs = document.querySelectorAll('.grid-cell');
    divs.forEach((div) => {
        // and for each one we add a 'click' listener
        div.addEventListener('click', () => {
            
            div.style.cssText = "background-color:black;";
        });
      });
}


makeGrid(32,32);
addEventListeners();