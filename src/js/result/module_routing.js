"use strict";

var angular = require("angular");

module.exports = function () {
  angular.module("result")
    .config(["$stateProvider", configure]);

  function configure($stateProvider) {
    $stateProvider
      .state("event-result", {
        url: "/events/:id/debts",
        controller: "ResultDetailsController",
        controllerAs: "model",
        templateUrl: "/templates/result/show"
      });
  }
};