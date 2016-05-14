"use strict";

function ExpenseBrickDirective() {
  return {
    restrict: "EA",
    scope: true,
    bindToController: {
      expense: "="
    },
    controller: "ExpenseBrickController",
    controllerAs: "brick",
    templateUrl: "/templates/expense/brick"
  };
}

module.exports = ExpenseBrickDirective;
