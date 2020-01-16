const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => `${colId}_${rowId}`;

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
  eraseTail(snake.tail, snake.species);
  drawSnake({ snakeLocation: snake.location, snakeSpecies: snake.species });
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyPress.bind(null, game);
};

const animateSnakes = game => {
  game.moveSnake();
  moveAndDrawSnake(game.status.snakeStatus);
  game.moveGhostSnake();
  moveAndDrawSnake(game.status.ghostSnakeStatus);
};

const randomlyTurnSnake = game => {
  let x = Math.random() * 100;
  if (x > 50) {
    game.turnGhostSnakeLeft();
  }
  if (x < 10) {
    game.turnGhostSnakeRight();
  }
};

const setup = function({ snakeStatus, ghostSnakeStatus, foodStatus }) {
  createGrids();
  drawSnake({
    snakeLocation: snakeStatus.location,
    snakeSpecies: snakeStatus.species
  });
  drawSnake({
    snakeLocation: ghostSnakeStatus.location,
    snakeSpecies: ghostSnakeStatus.species
  });
  drawFood(foodStatus.position, foodStatus.type);
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
const displayOver = () => {
  document.getElementById('gameOver').setAttribute('class', 'gameOver');
};

const displayScore = game =>
  (document.getElementById('score').innerText = game.score);

const gotFood = function(game) {
  if (game.isFindFood()) {
    randomGenerateFood(game);
    game.incrementScore();
    displayScore(game);
    game.growSnake();
    randomGenerateFood(game);
  }
};

const getRandomNumber = function(max) {
  return Math.floor(Math.random() * max);
};

const randomGenerateFood = function(game) {
  let foodStatus = game.foodStatus;
  eraseFood(foodStatus.position, foodStatus.type);
  const col = getRandomNumber(NUM_OF_COLS);
  const row = getRandomNumber(NUM_OF_ROWS);
  game.updateFood(col, row);
  foodStatus = game.foodStatus;
  drawFood(foodStatus.position, foodStatus.type);
};

const createNewGame = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(5, 5, 'simpleFood');
  const scoreCard = new Scorecard();
  return new Game(snake, ghostSnake, food, scoreCard);
};

const main = function() {
  const game = createNewGame();
  const status = game.status;
  attachEventListeners(game);
  setup(status);
  setInterval(() => {
    gotFood(game);
    animateSnakes(game);
    if (game.isOver()) {
      displayOver();
    }
  }, 100);
  setInterval(randomlyTurnSnake, 500, game);
  const foodGenerator = setInterval(
    () => {
      clearInterval(foodGenerator);
      randomGenerateFood;
      setInterval(randomGenerateFood, 15000, game);
    },
    15000,
    game
  );
};
