"use strict";

var angular = require("angular");

module.exports = function () {
  /* @ngInject */
  angular.module("app.event.result")
    .config(configure);

  function configure($stateProvider) {
    $stateProvider
      .state("event.result", {
        url: "/result",
        controller: "ResultDetailsController",
        controllerAs: "result",
        templateUrl: "/templates/event/result"
      });
  }
};