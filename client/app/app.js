import 'normalize.css';
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import Components from './components/components';
import AppComponent from './app.component';

angular.module('app', [
  uiRouter,
  Components,
])
  .config(($locationProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .component('app', AppComponent);
