"use strict";

var angular = require("angular");

module.exports = function () {
  /* @ngInject */
  angular.module("app.event.activity")
    .config(configure);

  function configure($stateProvider) {
    $stateProvider
      .state("event.activity", {
        url: "/activity",
        controller: "ActivityController",
        controllerAs: "activity",
        templateUrl: "/templates/event/activity"
      });
  }
};