class GameController {
  constructor() {
    this.name = 'game';
    this.grid = [];

    // TODO: Define constants in an angular constant provider instead here
    this.constants = {
      MAX_ROW: 50,
      MAX_COL: 50,
    };
  }

  $onInit() {
    // TODO: Use a service for all grid operations
    this._initializeGrid();
  }

  /**
   * Validate if the cell with the position x and y is a custom seed
   * @param {number} indexRow
   * @param {number} indexCol
   * @return {number}
   * @private
   */
  _isCustomSeed(indexRow, indexCol) {
    let seedFlag = 0;
    if ((indexRow === 0 && indexCol === 0) ||
      (indexRow === 0 && indexCol === 1) ||
      (indexRow === 1 && indexCol === 0) ||
      (indexRow === 1 && indexCol === 3) ||
      (indexRow === 2 && indexCol === 1) ||
      (indexRow === 2 && indexCol === 2)) {
      seedFlag = 1;
    }

    return seedFlag;
  };

  /**
   * Initialize the cells taking account the custom seeds
   * @param {number} indexRow
   * @return {Array}
   * @private
   */
  _initializeCells(indexRow) {
    const cells = [];

    // Generate cells
    for (let indexCol = 0; indexCol < this.constants.MAX_COL; indexCol += 1) {
      const cell = { active: this._isCustomSeed(indexRow, indexCol) };
      cells.push(cell);
    }

    return cells;
  }

  /**
   * Initialize the rows with cells
   * @return {Array}
   * @private
   */
  _initializeRows() {
    const rows = [];

    // Generate the rows
    for (let indexRow = 0; indexRow < this.constants.MAX_ROW; indexRow += 1) {
      const cols = this._initializeCells(indexRow);
      rows.push(cols);
    }

    return rows;
  }

  /*
   * Initialize the grid
   */
  _initializeGrid() {
    // Create the grid
    // Reset the grid
    this.grid = this._initializeRows();
  }
}

export default GameController;
