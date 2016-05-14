"use strict";

function NullIfZeroDirective() {
  return {
    restrict: "A",
    scope: false,
    link: link
  };

  function link(scope, element, attributes) {
    var property = attributes.debtsNullIfZero;
    scope[property] = scope.row[property] >= 0.005 ? scope.row[property] : null;
  }
}

module.exports = NullIfZeroDirective;
