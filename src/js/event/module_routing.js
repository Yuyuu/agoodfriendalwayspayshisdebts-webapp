"use strict";

var angular = require("angular");

module.exports = function () {
  angular.module("event")
    .config(["$routeProvider", configure]);

  function configure($routeProvider) {
    $routeProvider
      .when("/", {
        controller: "CreateEventController",
        controllerAs: "model",
        templateUrl: "/templates/index"
      })
      .when("/events/:id/dashboard", {
        controller: "ShowEventController",
        controllerAs: "model",
        templateUrl: "/templates/event/show"
      });
  }
};