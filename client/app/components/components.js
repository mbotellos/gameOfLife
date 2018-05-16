import angular from 'angular';
import Home from './home/home';

const componentModule = angular.module('app.components', [
  Home,
])

  .name;

export default componentModule;
