class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
  }
  get status() {
    return {
      snakeStatus: getSnakeStatus(this.snake),
      ghostSnakeStatus: getSnakeStatus(this.ghostSnake),
      food: this.food.position
    };
  }
  turnSnakeLeft() {
    this.snake.turnLeft();
  }
  turnSnakeRight() {
    this.snake.turnRight();
  }
  moveSnake() {
    this.snake.move();
  }
  isFindFood() {
    const snakeHead = this.snake.location[0];
    if (arePointsEqual(this.food.position, snakeHead)) {
    }
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
