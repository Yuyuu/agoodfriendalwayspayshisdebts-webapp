"use strict";

var angular = require("angular");

module.exports = function () {
  angular.module("app")
    .config(["$routeProvider", configure]);

  function configure($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/templates/index"
      })
      .otherwise({
        redirectTo: "/"
      });
  }
};