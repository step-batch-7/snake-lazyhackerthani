class Game {
  constructor(snake, ghostSnake, food, scoreCard) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.scoreCard = scoreCard;
  }
  get status() {
    return {
      snakeStatus: getSnakeStatus(this.snake),
      ghostSnakeStatus: getSnakeStatus(this.ghostSnake),
      foodStatus: this.foodStatus
    };
  }
  get foodStatus() {
    return { position: this.food.position, type: this.food.nature };
  }
  get score() {
    return this.scoreCard.score;
  }
  turnSnakeLeft() {
    this.snake.turnLeft();
  }
  turnSnakeRight() {
    this.snake.turnRight();
  }
  turnGhostSnakeLeft() {
    this.ghostSnake.turnLeft();
  }
  turnGhostSnakeRight() {
    this.ghostSnake.turnRight();
  }
  moveSnake() {
    this.snake.move();
  }
  moveGhostSnake() {
    this.ghostSnake.move();
  }
  updateFood(col, row) {
    this.food.update(col, row);
  }
  isFindFood() {
    const snakeHead = this.snake.location[this.snake.location.length - 1];
    return arePointsEqual(this.food.position, snakeHead);
  }
  incrementScore() {
    this.scoreCard.update(1);
  }
  growSnake() {
    this.snake.growHead();
  }
  isOver() {
    const snakeHead = this.snake.location[this.snake.location.length - 1];
    const snakeBody = this.ghostSnake.location.concat(
      this.snake.location.slice(0, -1)
    );
    return snakeBody.some(snakePart => arePointsEqual(snakePart, snakeHead));
  }
}

const arePointsEqual = function(point1, point2) {
  return point1[0] === point2[0] && point1[1] === point2[1];
};

const getSnakeStatus = function(snake) {
  return {
    location: snake.location,
    species: snake.species,
    tail: snake.previousTail
  };
};
