"use strict";

var angular = require("angular");

/* @ngInject */
function AffixDirective($affix, $window) {
  function link(scope, element) {
    $affix(element, {
      offsetTop: element.data("offset-top").toString(),
      offsetBottom: getPageFooterHeight(),
      target: angular.element($window)
    });
  }

  function getPageFooterHeight() {
    return angular.element(".page-footer").outerHeight(true).toString();
  }

  return {
    restrict: "A",
    link: link
  };
}

module.exports = AffixDirective;