const gridContainer = document.querySelector('.grid-container');
const slider = document.querySelector('.slider');
const rangeLabel = document.querySelector('.range-label');
const blackButton = document.querySelector('.black-button');
const rgbButton = document.querySelector('.rgb-button');
const clearButton = document.querySelector('.clear-button');

let isDragging = false;
let drawColor = '#595959';

// remove child nodes from container

function deleteGrid() {
    let child = gridContainer.lastElementChild;
    while (child) {
        gridContainer.removeChild(child);
        child = gridContainer.lastElementChild;
    }
}

// update the slider range label when slider is moved

function updateRangeLabel() {
    rangeLabel.textContent = `${slider.value} x ${slider.value}`;
}

// generate random color

function generateRandomColor() {
    const colorPalette = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF']
    let randomColor = Math.floor(Math.random() * colorPalette.length);
    let color = colorPalette[randomColor];
    return color;
}

// create grid from slider input

function createGrid() {
    deleteGrid();

    for (i = 0; i < slider.value * slider.value; i++) {
        let gridSquare = document.createElement('div');
        gridSquare.classList.add("grid-square");

        gridSquare.style.height = (625 / slider.value) + "px";
        gridSquare.style.width = gridSquare.style.height;
    
        gridContainer.appendChild(gridSquare);

        // click and drag to draw on etch a sketch

        gridSquare.addEventListener('mousedown', () => {
            if (drawColor == 'random') {
                gridSquare.style.backgroundColor = generateRandomColor();
            } else {
                gridSquare.style.backgroundColor = drawColor;
            }
        });

        gridSquare.addEventListener('mouseover', () => {
            if (isDragging) {
                if (drawColor == 'random') {
                    gridSquare.style.backgroundColor = generateRandomColor();
                } else {
                    gridSquare.style.backgroundColor = drawColor;
                }
            }
        });
    }

    updateRangeLabel();
}

createGrid();
slider.addEventListener('click', createGrid);
clearButton.addEventListener('click', createGrid);

// stop drawing when mouse button is released

gridContainer.addEventListener('mousedown', () => isDragging = true);
document.body.addEventListener('mouseup', () => isDragging = false);

// change draw color using buttons

blackButton.addEventListener('click', () => {
    drawColor = '#595959';
    blackButton.classList.remove("white");
    blackButton.classList.add("yellow");
    rgbButton.classList.remove("yellow");
    rgbButton.classList.add("white");
});

rgbButton.addEventListener('click', () => {
    drawColor = 'random';
    rgbButton.classList.remove("white");
    rgbButton.classList.add("yellow");
    blackButton.classList.remove("yellow");
    blackButton.classList.add("white");
});