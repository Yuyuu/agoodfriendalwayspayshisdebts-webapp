"use strict";

/* @ngInject */
function CurrencySymbolDirective($locale) {
  return {
    restrict: "AC",
    link: link
  };

  function link(scope, element) {
    element.html($locale.NUMBER_FORMATS.CURRENCY_SYM);
  }
}

module.exports = CurrencySymbolDirective;
