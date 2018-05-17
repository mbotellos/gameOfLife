class GameController {
  /* @ngInject */
  constructor($interval, gameService) {
    this.name = 'game';
    this.grid = [];
    this.currentGeneration = 0;
    this.isRunning = false;
    this.stopInterval = null;

    this.services = {
      $interval,
      game: gameService,
    };
  }

  $onInit() {
    this.start();
  }

  /**
   * Start the execution of game of life
   */
  start() {
    // Reset Generations
    this.currentGeneration = 0;
    if (!this.isRunning) {
      this.grid = this.services.game.initializeGrid();

      this.isRunning = true;
      this._run();
    }
  }

  /**
   * Run step by step in a loop the Game of Life
   */
  _run() {
    const gameService = this.services.game;
    // Run step by step the game in interval of 1000ms
    this.stopInterval = this.services.$interval(() => {
      this.currentGeneration += 1;
      this.grid = gameService.calculateNextGeneration();

      // if there are not cells alive stop the execution
      if (!gameService.areThereAlive()) {
        this.stop();
      }
    }, 1000);
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
}

export default GameController;
