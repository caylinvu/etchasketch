const gridContainer = document.querySelector('.grid-container');
const slider = document.querySelector('.slider');
const rangeLabel = document.querySelector('.range-label');

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


// create grid from slider input

function createGrid() {
    deleteGrid();

    for (i = 0; i < slider.value * slider.value; i++) {
        let gridSquare = document.createElement('div');
        gridSquare.classList.add("grid-square");

        gridSquare.style.height = (512 / slider.value) + "px";
        gridSquare.style.width = gridSquare.style.height;

        gridContainer.appendChild(gridSquare);

        // click and drag to draw on etch a sketch

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
    }

    updateRangeLabel();
}


createGrid();

slider.addEventListener('click', createGrid);

// add default (black) drawing function

// add clear function

// add RGB drawing function

// add shading function