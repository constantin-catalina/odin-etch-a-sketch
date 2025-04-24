const container = document.getElementById('grid-container');

function drawGrid(gridSize) {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        container.appendChild(cell);
    }
}

drawGrid(5);