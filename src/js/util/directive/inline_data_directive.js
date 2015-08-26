"use strict";

/* @ngInject */
function InlineElementDirective($parse) {
  return {
    restrict: "A",
    link: link
  };

  function link(scope, element, attributes) {
    var getItemFrom = $parse(attributes.debtsInlineData);
    var item = getItemFrom(scope);
    element.text(item.join(", "));
  }
}

module.exports = InlineElementDirective;
