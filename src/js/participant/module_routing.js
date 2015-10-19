"use strict";

var angular = require("angular");

module.exports = function () {
  /* @ngInject */
  angular.module("app.event.participant")
    .config(configure);

  function configure($stateProvider) {
    $stateProvider
      .state("event.participants", {
        url: "/participants",
        controller: "ParticipantsController",
        controllerAs: "participants",
        templateUrl: "/templates/event/participants"
      });
  }
};