class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
  }
  get status() {
    return {
      snake: this.snake,
      ghostSnake: this.ghostSnake,
      food: this.food
    };
  }
  moveSnake(keyCode) {
    const leftKey = 37;
    const rightKey = 39;
    if (keyCode === leftKey) {
      this.snake.turnLeft();
    }
    if (keyCode === rightKey) {
      this.snake.turnRight();
    }
  }
  isFindFood() {
    const snakeHead = this.snake.location[0];
    return arePointsEqual(this.food.position, snakeHead);
  }
}

const arePointsEqual = function(point1, point2) {
  return point1[0] === point2[0] && point1[1] === point2[1];
};
