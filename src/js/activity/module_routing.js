'use strict';

export default function ($stateProvider) {
  $stateProvider
    .state('event.activity', {
      url: '/activity',
      controller: 'ActivityController',
      controllerAs: 'activity',
      templateUrl: '/templates/event/activity'
    });
}
