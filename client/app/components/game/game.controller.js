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

  _initializeCells() {
    const cells = [];

    // Generate cells
    for (let indexCol = 0; indexCol < this.constants.MAX_COL; indexCol += 1) {
      const cell = { active: 0 };
      cells.push(cell);
    }

    return cells;
  }

  _initializeRows() {
    const rows = [];

    // Generate the rows
    for (let indexRow = 0; indexRow < this.constants.MAX_ROW; indexRow += 1) {
      const cols = this._initializeCells();
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
