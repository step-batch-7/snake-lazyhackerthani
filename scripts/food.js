class Food {
  constructor(colId, rowId, type) {
    this.colId = colId;
    this.rowId = rowId;
    this.type = type;
  }
  get position() {
    return [this.colId, this.rowId];
  }
  update(col, row) {
    this.colId = col;
    this.rowId = row;
  }
  get nature() {
    return this.type;
  }
}
