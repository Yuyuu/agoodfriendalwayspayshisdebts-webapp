"use strict";

// Must be a positive number with 1 or 2 optional decimals separated with a "." or a ","
var VALID_AMOUNT_REGEX = /^\d+((,|\.)\d{1,2})?$/;

/* @ngInject */
function CurrencyValidationDirective() {
  function link(scope, element, attributes, modelController) {
    modelController.$parsers.push(function (viewValue) {
      if (!VALID_AMOUNT_REGEX.test(viewValue)) {
        return undefined;
      }
      return convertToFloat(viewValue);
    });

    modelController.$validators.currency = function (modelValue) {
      return modelValue > 0;
    };
  }

  function convertToFloat(value) {
    return parseFloat(value.replace(",", "."));
  }

  return {
    restrict: "A",
    require: "ngModel",
    link: link
  };
}

module.exports = CurrencyValidationDirective;