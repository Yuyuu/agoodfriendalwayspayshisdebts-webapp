"use strict";

var angular = require("angular");

var internalModule = angular.module("app.internal", []);

internalModule.constant("AppEvents", require("./events"));

module.exports = internalModule.name;