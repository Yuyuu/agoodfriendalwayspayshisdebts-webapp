'use strict';

/* @ngInject */
export default function ($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('home', {
        url: '/home',
        controller: 'CreateEventController',
        controllerAs: 'model',
        templateUrl: '/templates/index'
      })
    .state('event', {
      abstract: true,
      url: '/events/:id',
      controller: 'EventController',
      controllerAs: 'model',
      templateUrl: '/templates/event/layout',
      resolve: {
        /* @ngInject */
        event: ($stateParams, Events) => {
          return Events.get($stateParams.id);
        }
      }
    });
  $urlRouterProvider.when('', '/home');
}
