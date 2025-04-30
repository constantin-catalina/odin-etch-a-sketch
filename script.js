const container = document.getElementById('grid-container');
const generateButton = document.getElementById('generate-grid');

function drawGrid(gridSize) {
    container.innerHTML = ''; 

    const containerSize = 500;
    const cellSize = containerSize / gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        container.appendChild(cell);
    }
}

function generateGrid() {
    const gridSize = parseInt(document.getElementById('grid-size').value);
    if( isNaN(gridSize) || gridSize < 1 || gridSize > 100) {    
        alert('Please enter a valid positive number for the grid size.');
        return;
    }
    drawGrid(gridSize);
}

generateButton.addEventListener('click', generateGrid);
drawGrid(parseInt(document.getElementById('grid-size').value));