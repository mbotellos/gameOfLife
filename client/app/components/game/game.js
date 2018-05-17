import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import gameComponent from './game.component';

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
  .name;

export default gameModule;
