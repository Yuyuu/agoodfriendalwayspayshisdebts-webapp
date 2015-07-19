"use strict";

var angular = require("angular");

/* @ngInject */
function DisableOnRequestDirective(AppEvents) {
  function link(scope, element, attributes, formController) {
    var formElement = angular.element("form[name=" + formController.$name + "]");
    formElement.on("submit", function () {
      if (formController.$valid) {
        angular.element(element).addClass("disabled");
      }
    });

    scope.$on(AppEvents.HTTP.REQUEST_ENDED, function () {
      angular.element(element).removeClass("disabled");
    });
  }

  return {
    restrict: "A",
    require: "^form",
    link: link
  };
}

module.exports = DisableOnRequestDirective;