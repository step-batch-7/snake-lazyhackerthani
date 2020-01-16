class Scorecard {
  constructor() {
    this.point = 0;
  }
  update(point) {
    this.point += point;
  }
  get score() {
    return this.point;
  }
}
