"use strict";

/* @ngInject */
function ElementValidationDirective() {
  function link(scope, element, attributes) {
    scope.$watch(
      attributes.elementValidation + ".$invalid && " + attributes.elementValidation + ".$dirty",
      function (hasError) {
        if (hasError) {
          element.addClass("has-error");
        }
      }
    );

    scope.$watch(
      attributes.elementValidation + ".$valid && " + attributes.elementValidation + ".$dirty",
      function (hasSuccess) {
        if (hasSuccess) {
          element.removeClass("has-error");
        }
      }
    );
  }

  return {
    restrict: "A",
    link: link
  };
}

module.exports = ElementValidationDirective;