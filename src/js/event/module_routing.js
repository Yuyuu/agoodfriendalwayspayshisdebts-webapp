"use strict";

var angular = require("angular");

module.exports = function () {
  /* @ngInject */
  angular.module("app.event")
    .config(configure);

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
        templateUrl: "/templates/event/layout",
        resolve: {
          /* @ngInject */
          event: function ($stateParams, Events) {
            return Events.get($stateParams.id);
          }
        }
      });
    $urlRouterProvider.when("", "/home");
  }
};