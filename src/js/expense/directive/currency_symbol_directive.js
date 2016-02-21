'use strict';

/* @ngInject */
export default function CurrencySymbolDirective($locale) {
  return {
    restrict: 'A',
    link: link
  };

  function link(scope, element) {
    element.html($locale.NUMBER_FORMATS.CURRENCY_SYM);
  }
}
