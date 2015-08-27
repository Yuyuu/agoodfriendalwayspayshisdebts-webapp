"use strict";

/* @ngInject */
function VisualIndicatorDirective() {
  function link(scope, element) {
    var cssClass = (scope.debt.amount >= 0.005) ? "danger" : "success";
    element.addClass(cssClass);
  }

  return {
    restrict: "A",
    link: link
  };
}

module.exports = VisualIndicatorDirective;