import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import homeComponent from './home.component';

const homeModule = angular.module('home', [
  uiRouter,
])

  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        component: 'home',
      });
  })

  .component('home', homeComponent)

  .name;

export default homeModule;
