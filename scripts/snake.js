class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get location() {
    return this.positions.slice();
  }
  get species() {
    return this.type;
  }
  turnLeft() {
    this.direction.turnLeft();
  }
  turnRight() {
    this.direction.turnRight();
  }
  move() {
    this.previousTail = this.positions.shift();
    this.growHead();
  }
  growHead() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    const [deltaX, deltaY] = this.direction.delta;
    const x = getNumberInRange(headX + deltaX, NUM_OF_COLS);
    const y = getNumberInRange(headY + deltaY, NUM_OF_ROWS);

    this.positions.push([x, y]);
  }
}

const getNumberInRange = function(id, max) {
  return id < 0 ? (id + max) % max : id % max;
};
