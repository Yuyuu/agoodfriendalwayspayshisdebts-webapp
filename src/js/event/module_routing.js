'use strict';

/* @ngInject */
export default function ($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('home', {
        url: '/home',
        controller: 'CreateEventController',
        controllerAs: 'model',
        templateUrl: '/templates/index'
      });
  $urlRouterProvider.when('', '/home');
}
