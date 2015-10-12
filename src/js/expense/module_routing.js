"use strict";

var angular = require("angular");

module.exports = function () {
  /* @ngInject */
  angular.module("app.event.expense")
    .config(configure);

  function configure($stateProvider) {
    $stateProvider
      .state("event.expenses", {
        url: "/expenses",
        templateUrl: "/templates/event/expenses"
      });
  }
};