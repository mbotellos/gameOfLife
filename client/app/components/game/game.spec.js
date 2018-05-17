import GameModule from './game';
import GameController from './game.controller';
import GameService from './game.service';
import GameComponent from './game.component';
import GameTemplate from './game.html';

describe('Game', () => {
  beforeEach(window.module(GameModule));

  describe('Controller', () => {
    let $interval;
    let gameServiceMock;
    let makeController;
    let controller;

    beforeEach(inject((_$interval_) => {
      $interval = _$interval_;
    }));

    beforeEach(() => {
      makeController = () => new GameController($interval, gameServiceMock);
      gameServiceMock = jasmine.createSpyObj('gameService', [
        'initializeGrid',
        'calculateNextGeneration',
        'areThereAlive']);

      controller = makeController();

      spyOn(controller, '_run').and.callThrough();
    });

    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      expect(controller.name).toBeDefined();
    });

    describe('when "start" method is executed', () => {
      it('currentGeneration is restarted', () => {
        controller.currentGeneration = 2;

        controller.start();

        expect(controller.currentGeneration).toBe(0);
      });

      it('_run method is executed if isRunning flag is true', () => {
        controller.isRunning = true;

        controller.start();

        expect(controller._run).not.toHaveBeenCalled();
      });

      it('the initializeGrid method of gameService is executed if isRunning is false', () => {
        controller.isRunning = false;

        controller.start();

        expect(gameServiceMock.initializeGrid).toHaveBeenCalled();
      });

      it('_run method is executed if isRunning is false ', () => {
        controller.isRunning = false;

        controller.start();

        expect(controller._run).toHaveBeenCalled();
      });
    });
  });

  describe('Component', () => {
    // component/directive specs
    const component = GameComponent;

    it('includes the intended template', () => {
      expect(component.template).toEqual(GameTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).toEqual(GameController);
    });
  });

  describe('Service', () => {
    let service;
    beforeEach(() => {
      inject(() => {
        service = new GameService();
      });
    });
  });
});
