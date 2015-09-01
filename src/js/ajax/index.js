"use strict";

var angular = require("angular");

var ajaxModule = angular.module("app.ajax", [require("../internal")]);

ajaxModule
  .factory("ajaxInterceptorService", require("./service/ajax_interceptor_service"))
  .directive("elementValidation", require("./directive/element_validation_directive"))
  .directive("disableOnRequest", require("./directive/disable_on_request_directive"));

ajaxModule.config(["$httpProvider", function ($httpProvider) {
  $httpProvider.interceptors.push("ajaxInterceptorService");
}]);

module.exports = ajaxModule.name;