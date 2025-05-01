const container = document.getElementById('grid-container');
const generateButton = document.getElementById('generate-grid');
const clearButton = document.getElementById('clear-grid');
const blackButton = document.getElementById('black');
const rainbowButton = document.getElementById('rainbow');
const eraserButton = document.getElementById('eraser');
const colorPicker = document.getElementById('color-picker');

let currentColor = 'white';

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
                if(cell.style.backgroundColor === 'white') {
                    cell.style.opacity = '0.1'; 
                }
                cell.style.backgroundColor = 'black';
                applyProgressiveDarkening(cell, 'black');
            } else if (rainbowButton.classList.contains('active')) {
                if(cell.style.backgroundColor === 'white') {
                    cell.style.opacity = '0.1'; 
                }
                const currentColor = cell.style.backgroundColor;
                if (currentColor === 'white' || currentColor === '' || currentColor === 'rgb(255, 255, 255)') {
                    cell.style.backgroundColor = getRandomColor(); 
                }           
                applyProgressiveDarkening(cell, cell.style.backgroundColor);
            } else if (eraserButton.classList.contains('active')) {
                cell.style.backgroundColor = 'white';
                cell.style.opacity = '1'; 
            } else if (colorPicker.classList.contains('active')) {
                if(cell.style.backgroundColor === 'white') {
                    cell.style.opacity = '0.1'; 
                }                
                cell.style.backgroundColor = currentColor;
                applyProgressiveDarkening(cell, currentColor);
            }
        });

        container.appendChild(cell);
    }
}

function setActiveButton(selectedButton) {
    [blackButton, rainbowButton, eraserButton, colorPicker].forEach(button => {
        button.classList.remove('active');
    });
    selectedButton.classList.add('active');
}

blackButton.addEventListener('click', () => setActiveButton(blackButton));
rainbowButton.addEventListener('click', () => setActiveButton(rainbowButton));
eraserButton.addEventListener('click', () => setActiveButton(eraserButton));

colorPicker.addEventListener('input', (event) => {
    currentColor = event.target.value;
    setActiveButton(colorPicker);
});
colorPicker.addEventListener('click', () => setActiveButton(colorPicker));

setActiveButton(blackButton); // default to black mode

function clearGrid() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
        cell.style.opacity = '1';
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

function applyProgressiveDarkening(cell, color) {
    const currentOpacity = parseFloat(cell.style.opacity) || 0.1;
    const newOpacity = Math.min(Math.max(currentOpacity + 0.1, 0.1), 1);
    cell.style.opacity = newOpacity;
    cell.style.backgroundColor = color;
}