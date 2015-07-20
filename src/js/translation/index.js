"use strict";

var angular = require("angular");

var translationModule = angular.module("translations", [require("ng-i18next")]);

translationModule.config(["$i18nextProvider", function ($i18nextProvider) {
  $i18nextProvider.options = {
    resGetPath: "/locales/resources.json?lng=__lng__&ns=__ns__",
    dynamicLoad: true,
    defaultLoadingValue: ""
  };
}]);

module.exports = translationModule.name;