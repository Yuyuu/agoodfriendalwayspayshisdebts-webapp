"use strict";

var angular = require("angular");

var internalModule = angular.module("internal", []);

internalModule.constant("AppEvents", require("./events"));

module.exports = internalModule.name;