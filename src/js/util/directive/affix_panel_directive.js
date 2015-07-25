"use strict";

var angular = require("angular");

/* @ngInject */
function AffixDirective($affix, $window) {
  function link(scope, element) {
    var affix;
    var purchaseCreationPanelElement = angular.element(element);
    var purchasesListPanelElement = angular.element(".purchases-list-panel");

    scope.$watch(listPanelIsTallerThanCreationPanel, function (shouldApplyAffix) {
      if (shouldApplyAffix) {
        affix = $affix(element, {
          offsetTop: element.data("offset-top").toString(),
          offsetBottom: getPageFooterHeight().toString(),
          target: angular.element($window)
        });
      } else {
        affix && affix.destroy();
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