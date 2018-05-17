import angular from 'angular';
import Game from './game/game';

const componentModule = angular.module('app.components', [
  Game,
]).name;

export default componentModule;
