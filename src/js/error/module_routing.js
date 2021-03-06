"use strict";

var angular = require("angular");

module.exports = function () {
  /* @ngInject */
  angular.module("app.error")
    .config(configure);

  function configure($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("404", {
        url: "/404",
        templateUrl: "/templates/error/404"
      })
      .state("error", {
        url: "/error",
        templateUrl: "/templates/error/default"
      });
    $urlRouterProvider.otherwise("/404");
  }
};