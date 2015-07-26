"use strict";

var angular = require("angular");

angular.module("app", [
  require("angular-sanitize"),
  require("angular-route"),
  require("angular-animate"),
  require("angular-loading-bar"),
  require("angular-strap"),
  require("./ajax"),
  require("./translation"),
  require("./event"),
  require("./result"),
  require("./util")
]);

angular.module("app").config(["$routeProvider", configure]);

function configure($routeProvider) {
  $routeProvider
    .when("/", {
      controller: "CreateEventController",
      controllerAs: "model",
      templateUrl: "/templates/index"
    })
    .otherwise({
      redirectTo: "/"
    });
}