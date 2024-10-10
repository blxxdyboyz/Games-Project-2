const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Размеры клетки на сетке
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Положение Pac-Man
let pacman = {
    x: 1,
    y: 1,
    dx: 0,
    dy: 0,
    radius: gridSize / 2
};

// Массив для уровня (1 - стена, 0 - пустое место, 2 - точка)
const level = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 0, 1],
    [1, 0, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 0, 1],
    [1, 2, 1, 0, 2, 0, 2, 0, 2, 1, 0, 1, 2, 0, 2, 0, 2, 0, 1, 0, 2, 0, 1, 2, 1],
    [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 0, 0, 2, 1, 2, 1, 2, 1, 0, 0, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 1, 2, 2, 1, 2, 1, 0, 0, 2, 1, 2, 1, 2, 1, 0, 0, 2, 2, 2, 1, 1, 2, 1],
    [1, 2, 1, 2, 1, 1, 2, 1, 0, 0, 2, 1, 2, 1, 2, 1, 0, 0, 2, 1, 2, 1, 2, 2, 1],
    [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Управление
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            pacman.dx = 0;
            pacman.dy = -1;
            break;
        case 'ArrowDown':
            pacman.dx = 0;
            pacman.dy = 1;
            break;
        case 'ArrowLeft':
            pacman.dx = -1;
            pacman.dy = 0;
            break;
        case 'ArrowRight':
            pacman.dx = 1;
            pacman.dy = 0;
            break;
    }
});

// Рисуем уровень
function drawLevel() {
    for (let y = 0; y < level.length; y++) {
        for (let x = 0; x < level[y].length; x++) {
            if (level[y][x] === 1) {
                ctx.fillStyle = 'blue'; // стены
                ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
            } else if (level[y][x] === 2) {
                ctx.fillStyle = 'yellow'; // точки
                ctx.beginPath();
                ctx.arc(x * gridSize + gridSize / 2, y * gridSize + gridSize / 2, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

// Рисуем Pac-Man
function drawPacman() {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(
        pacman.x * gridSize + gridSize / 2,
        pacman.y * gridSize + gridSize / 2,
        pacman.radius,
        0.2 * Math.PI,
        1.8 * Math.PI
    );
    ctx.lineTo(pacman.x * gridSize + gridSize / 2, pacman.y * gridSize + gridSize / 2);
    ctx.fill();
}

// Обновляем состояние игры
function updateGame() {
    // Проверка на стены
    if (level[pacman.y + pacman.dy][pacman.x + pacman.dx] !== 1) {
        pacman.x += pacman.dx;
        pacman.y += pacman.dy;
    }

    // Очистка точки, если Pac-Man на ней
    if (level[pacman.y][pacman.x] === 2) {
        level[pacman.y][pacman.x] = 0;
    }

    pacman.dx = 0;
    pacman.dy = 0;
}

// Игровой цикл
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLevel();
    drawPacman();
    updateGame();
    requestAnimationFrame(gameLoop);
}

// Старт игры
gameLoop();
