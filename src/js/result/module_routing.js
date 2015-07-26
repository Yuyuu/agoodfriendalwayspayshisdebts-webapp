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
        templateUrl: "/templates/result/show",
        resolve: {
          event: ["$route", "Events", function ($route, Events) {
            return Events.get({id: $route.current.params.id}).$promise;
          }],
          results: ["$route", "Results", function ($route, Results) {
            return Results.get($route.current.params.id);
          }]
        }
      });
  }
};