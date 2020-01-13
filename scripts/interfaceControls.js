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

const eraseTail = function([colId, rowId], snakeSpecies) {
  const cell = getCell(colId, rowId);
  cell.classList.remove(snakeSpecies);
};

const drawSnake = function({ snakeLocation, snakeSpecies }) {
  snakeLocation.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snakeSpecies);
  });
};

const eraseFood = function([colId, rowId], foodType) {
  const cell = getCell(colId, rowId);
  cell.classList.remove(foodType);
};

const drawFood = function([colId, rowId], type) {
  const cell = getCell(colId, rowId);
  cell.classList.add(type);
};

const handleKeyPress = game => {
  const leftKey = 37;
  const rightKey = 39;
  const keyCode = event.keyCode;
  if (keyCode === leftKey) {
    game.turnSnakeLeft();
  }
  if (keyCode === rightKey) {
    game.turnSnakeRight();
  }
};

const moveAndDrawSnake = function(snake) {
  snake.move();
  eraseTail(snake.previousTail, snake.species);
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

const getRandomNumber = function(max) {
  return Math.floor(Math.random() * max);
};

const randomGenerateFood = function(food) {
  eraseFood(food.position, food.nature);
  const col = getRandomNumber(NUM_OF_COLS);
  const row = getRandomNumber(NUM_OF_ROWS);
  food.update(col, row);
  drawFood(food.position, food.nature);
};

const main = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();

  const food = new Food(5, 5, 'simpleFood');
  const game = new Game(snake, ghostSnake, food);
  setup(game);
  drawFood(food.position, food.nature);
  setInterval(() => {
    animateSnakes(snake, ghostSnake);
    gotFood(game);
  }, 200);
  setInterval(randomlyTurnSnake, 500, ghostSnake);
  setInterval(randomGenerateFood, 5000, food);
};
