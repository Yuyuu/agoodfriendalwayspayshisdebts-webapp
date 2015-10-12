"use strict";

/* @ngInject */
function InitialDirective() {
  return {
    restrict: "EAC",
    templateUrl: "/templates/participant/avatar",
    link: link
  };

  function link(scope) {
    scope.initial = scope.participant.name[0];
  }
}

module.exports = InitialDirective;
