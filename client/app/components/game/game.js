import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import gameComponent from './game.component';
import gameService from './game.service';

const gameModule = angular.module('game', [
  uiRouter,
])

  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('game', {
        url: '/',
        component: 'game',
      });
  })

  .component('game', gameComponent)
  .service('gameService', gameService)
  .name;

export default gameModule;
