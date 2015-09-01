"use strict";

var angular = require("angular");

module.exports = function () {
  angular.module("app.event.result")
    .config(["$stateProvider", configure]);

  function configure($stateProvider) {
    $stateProvider
      .state("event.result", {
        url: "/result",
        controller: "ResultDetailsController",
        controllerAs: "model",
        templateUrl: "/templates/event/result"
      });
  }
};