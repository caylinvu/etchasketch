const gridContainer = document.querySelector('.grid-container');
const slider = document.querySelector('.slider');
const rangeLabel = document.querySelector('.range-label');
const blackButton = document.querySelector('.black-button');
const rgbButton = document.querySelector('.rgb-button');
const clearButton = document.querySelector('.clear-button');

let isDragging = false;
let drawColor = 'rgb(0,0,0)';

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

// clear grid when clear button is clicked

function clearGrid() {
    clearButton.addEventListener('click', () => {
        let nodes = gridContainer.children;
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].style.backgroundColor = 'lightgrey';
        }
    });    
}

// generate random color

function generateRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// create grid from slider input

function createGrid() {
    deleteGrid();

    for (i = 0; i < slider.value * slider.value; i++) {
        let gridSquare = document.createElement('div');
        gridSquare.classList.add("grid-square");

        gridSquare.style.height = (600 / slider.value) + "px";
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
clearGrid();
slider.addEventListener('click', createGrid);

// stop drawing when mouse button is released

gridContainer.addEventListener('mousedown', () => isDragging = true);
document.body.addEventListener('mouseup', () => isDragging = false);

// change draw color using buttons

blackButton.addEventListener('click', () => {
    drawColor = 'black';
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