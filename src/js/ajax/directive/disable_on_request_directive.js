"use strict";

var angular = require("angular");

/* @ngInject */
function DisableOnRequestDirective(AppEvents) {
  function link(scope, element, attributes, formController) {
    var initialButtonText = element.html();
    var loadingButtonText = attributes.loadingText;
    var formElement = angular.element("form[name='" + formController.$name + "']");

    formElement.on("submit", function () {
      if (formController.$valid) {
        element.addClass("disabled");
        element.html(loadingButtonText);
      }
    });

    scope.$on(AppEvents.HTTP.REQUEST_ENDED, function () {
      element.html(initialButtonText);
      element.removeClass("disabled");
    });
  }

  return {
    restrict: "A",
    require: "^form",
    link: link
  };
}

module.exports = DisableOnRequestDirective;