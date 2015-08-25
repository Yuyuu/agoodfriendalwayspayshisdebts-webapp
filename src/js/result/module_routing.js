"use strict";

var angular = require("angular");

module.exports = function () {
  angular.module("result")
    .config(["$routeProvider", configure]);

  function configure($routeProvider) {
    $routeProvider
      .when("/events/:id/debts", {
        controller: "ResultDetailsController",
        controllerAs: "model",
        templateUrl: "/templates/result/show"
      });
  }
};