"use strict";

var angular = require("angular");

var internalModule = angular.module("app.internal", [require("../core")]);

internalModule
  .constant("AppEvents", require("./events"))
  .service("bootstrapService", require("./service/bootstrap_service"));

module.exports = internalModule.name;