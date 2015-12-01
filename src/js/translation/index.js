"use strict";

var angular = require("angular");

var translationModule = angular.module("app.translations", [require("../core")]);

/* @ngInject */
translationModule.config(function ($i18nextProvider) {
  $i18nextProvider.options = {
    resGetPath: "/locales/resources.json?lng=__lng__&ns=__ns__",
    dynamicLoad: true,
    defaultLoadingValue: ""
  };
});

translationModule
  .provider("lng", require("./lng"));

module.exports = translationModule.name;