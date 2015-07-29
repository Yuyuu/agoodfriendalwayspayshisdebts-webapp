"use strict";

var angular = require("angular");
var configureModuleRouting = require("./module_routing");

var errorModule = angular.module("error", []);

errorModule
  .factory("Error404InterceptorService", require("./service/error_404_interceptor_service"))
  .factory("DefaultErrorInterceptorService", require("./service/default_error_interceptor_service"));

errorModule
  .config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("Error404InterceptorService");
    $httpProvider.interceptors.push("DefaultErrorInterceptorService");
  }]);

configureModuleRouting();

module.exports = errorModule.name;