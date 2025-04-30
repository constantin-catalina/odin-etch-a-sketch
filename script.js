const container = document.getElementById('grid-container');
const generateButton = document.getElementById('generate-grid');
const clearButton = document.getElementById('clear-grid');
const blackButton = document.getElementById('black');
const rainbowButton = document.getElementById('rainbow');
const eraserButton = document.getElementById('eraser');

function drawGrid(gridSize) {
    container.innerHTML = ''; 

    const containerSize = 500;
    const cellSize = containerSize / gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        
        cell.addEventListener('mouseover', () => {
            if (blackButton.classList.contains('active')) {
                cell.style.backgroundColor = 'black';
            } else if (rainbowButton.classList.contains('active')) {
                const currentColor = cell.style.backgroundColor;
                if (currentColor === 'white' || currentColor === '' || currentColor === 'rgb(255, 255, 255)') {
                    cell.style.backgroundColor = getRandomColor(); 
                }           
            } else if (eraserButton.classList.contains('active')) {
                cell.style.backgroundColor = 'white';
            }
        });

        container.appendChild(cell);
    }
}

function setActiveButton(selectedButton) {
    [blackButton, rainbowButton, eraserButton].forEach(button => {
        button.classList.remove('active');
    });
    selectedButton.classList.add('active');
}

blackButton.addEventListener('click', () => setActiveButton(blackButton));
rainbowButton.addEventListener('click', () => setActiveButton(rainbowButton));
eraserButton.addEventListener('click', () => setActiveButton(eraserButton));

setActiveButton(blackButton); // default to black mode

function clearGrid() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
    });
}

clearButton.addEventListener('click', clearGrid);

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

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}