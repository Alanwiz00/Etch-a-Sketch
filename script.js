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

function hexToRGBa(hex, alpha) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map(x => x + x).join('');
    }
    const num = parseInt(hex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function createGrid(size) {
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        let containerSize = 700;
        cell.style.width = `${containerSize / size}px`;
        cell.style.height = `${containerSize / size}px`;
        const color = getColor();
        cell.dataset.color = color;
        cell.dataset.opcacity = "1";
        cell.style.backgroundColor = hexToRGBa(color, 0);
        container.appendChild(cell);

        cell.addEventListener('mouseover', () => {
            let opacity = parseFloat(cell.dataset.opcacity);
            if (opacity > 0) {
                opacity = Math.min(opacity - 0.1, 1);
                cell.dataset.opcacity = opacity.toString();
                cell.style.backgroundColor = hexToRGBa(cell.dataset.color, opacity);
            }
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