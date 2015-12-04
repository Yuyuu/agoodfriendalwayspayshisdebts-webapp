"use strict";

/* @ngInject */
function VisualIndicatorDirective() {
  return {
    restrict: "A",
    link: link
  };

  function link(scope, element) {
    if (scope.row.mitigatedDebt >= 0.005) {
      element.addClass("danger");
    } else if (scope.row.advance >= 0.005) {
      element.addClass("warning");
    }
  }
}

module.exports = VisualIndicatorDirective;