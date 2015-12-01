"use strict";

var angular = require("angular");

angular.module("app", [
    require("./core"),
    require("./ajax"),
    require("./notification"),
    require("./translation"),
    require("./event"),
    require("./utils"),
    require("./error")
])
  .run(run);

/* @ngInject */
function run(bootstrapService) {
  bootstrapService.start();
}