"use strict";

var angular = require("angular");

module.exports = function () {
  angular.module("event")
    .config(["$routeProvider", configure]);

  function configure($routeProvider) {
    $routeProvider
      .when("/events/:id/dashboard", {
        controller: "ShowEventController",
        controllerAs: "model",
        templateUrl: "/templates/event/show",
        resolve: {
          event: ["$route", "Events", function ($route, Events) {
            return Events.get({id: $route.current.params.id}).$promise;
          }]
        }
      });
  }
};