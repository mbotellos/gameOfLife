class GameController {
  /* @ngInject */
  constructor($interval) {
    this.name = 'game';
    this.grid = [];
    this.currentGeneration = 0;
    this.isRunning = false;
    this.stopInterval = null;
    this.thereAreAlive = true;

    this.services = {
      $interval,
    };
    // TODO: Define constants in an angular constant provider instead here
    this.constants = {
      MAX_ROW: 50,
      MAX_COL: 50,
    };
  }

  $onInit() {
    // TODO: Use a service for all grid operations
    this._initializeGrid();
    this.start();
  }

  /**
   * Start the execution of game of life
   */
  start() {
    // Reset Generations
    this.currentGeneration = 0;

    if (!this.isRunning) {
      this.isRunning = true;
      // Run step by step the game in interval of 1000ms
      this.stopInterval = this.services.$interval(() => {
        this.currentGeneration += 1;
        this._calculateNextGeneration();

        if (!this.thereAreAlive) {
          this.stop();
        }
      }, 1000);
    }
  }

  /**
   * Stop the execution of game of life
   */
  stop() {
    if (this.stopInterval) {
      this.services.$interval.cancel(this.stopInterval);
      this.isRunning = false;
      this.stopInterval = null;
    }
  }

  /**
   * Validate if exist in the grid datum with the row and the column received
   * @param {Array} grid
   * @param {number} indexRow
   * @param {number} indexCol
   * @return {Boolean}
   */
  _isValidAndActiveCell(grid, indexRow, indexCol) {
    return grid[indexRow] &&
      grid[indexRow][indexCol] &&
      grid[indexRow][indexCol].active;
  }

  /**
   * Get the total of neighbors of the cell received
   * @param {Array} grid
   * @param {number} row
   * @param {number} col
   * @return {number}
   * @private
   */
  _getTotalNeighbors(grid, row, col) {
    let total = 0;
    // Check all neighbors taking an area from the previous row and until the next row
    for (let indexRow = row - 1; indexRow <= row + 1; indexRow += 1) {
      // Check all neighbors taking an area from the previous column and until the next column
      for (let indexCol = col - 1; indexCol <= col + 1; indexCol += 1) {
        const isNotCurrentRow = (indexRow !== row || indexCol !== col);
        if (isNotCurrentRow && this._isValidAndActiveCell(grid, indexRow, indexCol)) {
          total += 1;
        }
      }
    }
    return total;
  }

  /**
   * Calculate the next generation of the grid with the game of life rules
   * Game of Life rules, source: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules
   * 1- Any live cell with fewer than two live neighbors dies, as if caused by under population.
   * 2- Any live cell with two or three live neighbors lives on to the next generation.
   * 3- Any live cell with more than three live neighbors dies, as if by overpopulation.
   * 4- Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
   * @private
   */
  _calculateNextGeneration() {
    const currentGrid = angular.copy(this.grid);

    this.grid.forEach((row, indexRow) => {
      row.forEach((cell, indexCell) => {
        // Get the total of neighbors
        const totalNeighbors = this._getTotalNeighbors(currentGrid, indexRow, indexCell);
        // Validate with game of life rules
        if (cell.active) {
          if (totalNeighbors > 1 && totalNeighbors < 4) {
            // Second Rule
            cell.active = 1;
          } else {
            // First and Third Rule
            cell.active = 0;
          }
        } else if (totalNeighbors === 3) {
          // Fourth Rule
          cell.active = 1;
        }

        // Check if some cell is alive
        if (cell.active) {
          this.thereAreAlive = true;
        }
      });
    });
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
  }

  /**
   * Initialize all the cells in the columns taking account the custom seeds
   * @param {number} indexRow
   * @return {Array}
   * @private
   */
  _initializeCols(indexRow) {
    const cols = [];

    // Generate cells
    for (let indexCol = 0; indexCol < this.constants.MAX_COL; indexCol += 1) {
      const cell = { active: this._isCustomSeed(indexRow, indexCol) };
      cols.push(cell);
    }

    return cols;
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
      const cols = this._initializeCols(indexRow);
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
