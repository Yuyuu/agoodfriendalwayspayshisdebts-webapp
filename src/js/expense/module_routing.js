'use strict';

/* @ngInject */
export default function ($stateProvider) {
  $stateProvider
    .state('event.expenses', {
      url: '/expenses',
      templateUrl: '/templates/event/expenses'
    });
}
