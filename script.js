const container = document.getElementById('container');
const resetButton = document.getElementById('reset');

function getColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createGrid(size) {
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        let containerSize = 700;
        cell.style.width = `${containerSize / size}px`;
        cell.style.height = `${containerSize / size}px`;
        container.appendChild(cell);
        cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = getColor();
        });
    }
}

function reset(input) {
    const newSize = parseInt(input);
    if (
        isNaN(newSize) || newSize <= 0 || newSize > 100
    ) {
        alert("Please enter a valid number between 1 and 100.");
        return;
    } else {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.remove();
        });
        createGrid(newSize);
    }
}

resetButton.addEventListener('click', () => {
    const input = prompt("Enter the new grid size (1-100):");
    reset(input);
});

createGrid(16); // Default grid size