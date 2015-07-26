"use strict";

var angular = require("angular");

/* @ngInject */
function AffixDirective($affix, $window, $timeout) {
  function link(scope, element) {
    var affix;
    var purchaseCreationPanelElement = angular.element(element);
    var purchasesListPanelElement = angular.element(".purchases-list-panel");

    scope.$watch(listPanelIsTallerThanCreationPanel, function (shouldApplyAffix) {
      if (shouldApplyAffix) {
        // Only way found to make it work after route change (https://github.com/mgcrea/angular-strap/issues/1493)
        $timeout(function () {
          affix = $affix(element, {
            offsetTop: element.data("offset-top").toString(),
            offsetBottom: getPageFooterHeight().toString(),
            target: angular.element($window)
          });
        });
      } else {
        affix && affix.destroy();
      }
    });

    scope.$on("$destroy", function() {
      affix && affix.destroy();
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