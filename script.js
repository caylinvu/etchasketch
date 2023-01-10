const gridContainer = document.querySelector('.grid-container');
const slider = document.querySelector('.slider');
const rangeLabel = document.querySelector('.range-label');

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
    }

    updateRangeLabel();
}


createGrid();

slider.addEventListener('click', createGrid);

// add default (black) drawing function

// add clear function

// add RGB drawing function

// add shading function