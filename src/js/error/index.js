"use strict";

var angular = require("angular");
var configureModuleRouting = require("./module_routing");

var errorModule = angular.module("app.error", []);

errorModule
  .factory("defaultErrorInterceptorService", require("./service/default_error_interceptor_service"));

/* @ngInject */
errorModule
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push("defaultErrorInterceptorService");
  });

configureModuleRouting();

module.exports = errorModule.name;