const gridContainer = document.querySelector('.grid-container');
const slider = document.querySelector('.slider');
const rangeLabel = document.querySelector('.range-label');
const blackButton = document.querySelector('.black-button');
const rgbButton = document.querySelector('.rgb-button');
const shadingButton = document.querySelector('.shading-button');
const clearButton = document.querySelector('.clear-button');

let isDragging = false;

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

        gridSquare.style.height = (512 / slider.value) + "px";
        gridSquare.style.width = gridSquare.style.height;

        gridContainer.appendChild(gridSquare);

        // click and drag to draw on etch a sketch (default color - black)

        gridSquare.addEventListener('mousedown', () => {
            isDragging = true;
            gridSquare.style.backgroundColor = 'black';
        });

        gridSquare.addEventListener('mouseover', () => {
            if (isDragging) {
                gridSquare.style.backgroundColor = 'black';
            }
        });

        gridSquare.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // change drawing color back to black after pressing black button

        blackButton.addEventListener('click', () => {
            gridSquare.addEventListener('mousedown', () => {
                isDragging = true;
                gridSquare.style.backgroundColor = 'black';
            });

            gridSquare.addEventListener('mouseover', () => {
                if (isDragging) {
                    gridSquare.style.backgroundColor = 'black';
                }
            });
    
            gridSquare.addEventListener('mouseup', () => {
                isDragging = false;
            });
        });

        // change drawing color to RGB after pressing RGB button

        rgbButton.addEventListener('click', () => {
            gridSquare.addEventListener('mousedown', () => {
                isDragging = true;
                gridSquare.style.backgroundColor = generateRandomColor();
            });

            gridSquare.addEventListener('mouseover', () => {
                if (isDragging) {
                    gridSquare.style.backgroundColor = generateRandomColor();
                }
            });
    
            gridSquare.addEventListener('mouseup', () => {
                isDragging = false;
            });
        });

    }

    updateRangeLabel();
    clearGrid();
}


createGrid();

slider.addEventListener('click', createGrid);

// add RGB drawing function

// add shading function

// add UI