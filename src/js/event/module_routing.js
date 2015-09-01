"use strict";

var angular = require("angular");

module.exports = function () {
  angular.module("event")
    .config(["$stateProvider", "$urlRouterProvider", configure]);

  function configure($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/home",
        controller: "CreateEventController",
        controllerAs: "model",
        templateUrl: "/templates/index"
      })
      .state("event-details", {
        url: "/events/:id/dashboard",
        controller: "ShowEventController",
        controllerAs: "model",
        templateUrl: "/templates/event/show"
      });
    $urlRouterProvider.when("", "/home");
  }
};