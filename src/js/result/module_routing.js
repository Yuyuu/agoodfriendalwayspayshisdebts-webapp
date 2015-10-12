"use strict";

var angular = require("angular");

module.exports = function () {
  /* @ngInject */
  angular.module("app.event.result")
    .config(configure);

  function configure($stateProvider) {
    $stateProvider
      .state("event.results", {
        url: "/results",
        controller: "ResultsController",
        controllerAs: "results",
        templateUrl: "/templates/event/results"
      });
  }
};