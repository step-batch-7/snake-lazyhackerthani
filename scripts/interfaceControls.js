const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const eraseTail = function(snake) {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const drawSnake = function({ snakeLocation, snakeSpecies }) {
  snakeLocation.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snakeSpecies);
  });
};

const drawFood = function([colId, rowId]) {
  const cell = getCell(colId, rowId);
  cell.classList.add('simpleFood');
};

const handleKeyPress = game => {
  game.moveSnake(event.keyCode);
};

const moveAndDrawSnake = function(snake) {
  snake.move();
  eraseTail(snake);
  drawSnake({ snakeLocation: snake.location, snakeSpecies: snake.species });
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyPress.bind(null, game);
};

const animateSnakes = (snake, ghostSnake) => {
  moveAndDrawSnake(snake);
  moveAndDrawSnake(ghostSnake);
};

const randomlyTurnSnake = snake => {
  let x = Math.random() * 100;
  if (x > 50) {
    snake.turnLeft();
  }
};

const setup = function(game) {
  let { snakeStatus, ghostSnakeStatus } = game.status;
  attachEventListeners(game);
  createGrids();
  drawSnake({
    snakeLocation: snakeStatus.location,
    snakeSpecies: snakeStatus.species
  });
  drawSnake({
    snakeLocation: ghostSnakeStatus.location,
    snakeSpecies: ghostSnakeStatus.species
  });
};

const initSnake = function() {
  return new Snake(
    [
      [40, 25],
      [41, 25],
      [42, 25]
    ],
    new Direction(EAST),
    'snake'
  );
};
const initGhostSnake = function() {
  return new Snake(
    [
      [40, 30],
      [41, 30],
      [42, 30]
    ],
    new Direction(SOUTH),
    'ghost'
  );
};

const main = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();

  const food = new Food(5, 5);
  const game = new Game(snake, ghostSnake, food);
  setup(game);
  drawFood(food.position);
  setInterval(animateSnakes, 200, snake, ghostSnake);
  setInterval(randomlyTurnSnake, 500, ghostSnake);
};
