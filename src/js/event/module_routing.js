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
      .state("event", {
        abstract: true,
        url: "/events/:id",
        controller: "ShowEventController",
        controllerAs: "model",
        templateUrl: "/templates/event/layout"
      })
      .state("event.details", {
        url: "/details",
        templateUrl: "/templates/event/details"
      });
    $urlRouterProvider.when("", "/home");
  }
};