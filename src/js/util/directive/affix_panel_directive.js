"use strict";

var angular = require("angular");

/* @ngInject */
function AffixDirective($affix, $window) {
  var it = this;
  this.affix = null;

  function link(scope, element) {
    var purchaseCreationPanelElement = angular.element(element);
    var purchasesListPanelElement = angular.element(".purchases-list-panel");

    scope.$watch(listPanelIsTallerThanCreationPanel, function (shouldApplyAffix) {
      if (shouldApplyAffix) {
        it.affix = $affix(element, {
          offsetTop: element.data("offset-top").toString(),
          offsetBottom: getPageFooterHeight().toString(),
          target: angular.element($window)
        });
      } else {
        it.affix && it.affix.destroy();
      }
    });

    function listPanelIsTallerThanCreationPanel() {
      return purchasesListPanelElement.outerHeight(true) > purchaseCreationPanelElement.outerHeight(true);
    }

    function getPageFooterHeight() {
      return angular.element(".page-footer").outerHeight(true);
    }
  }

  return {
    restrict: "A",
    link: link
  };
}

module.exports = AffixDirective;