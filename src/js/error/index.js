"use strict";

var angular = require("angular");
var configureModuleRouting = require("./module_routing");

var errorModule = angular.module("app.error", []);

errorModule
  .factory("error404InterceptorService", require("./service/error_404_interceptor_service"))
  .factory("defaultErrorInterceptorService", require("./service/default_error_interceptor_service"));

/* @ngInject */
errorModule
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push("error404InterceptorService");
    $httpProvider.interceptors.push("defaultErrorInterceptorService");
  });

configureModuleRouting();

module.exports = errorModule.name;