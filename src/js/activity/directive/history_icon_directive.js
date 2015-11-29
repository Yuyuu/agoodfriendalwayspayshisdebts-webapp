"use strict";

var icon = {
  "NEW_EXPENSE": "fa-plus-circle",
  "EXPENSE_DELETED": "fa-minus-circle",
  "NEW_PARTICIPANT": "fa-user-plus",
  "PARTICIPANT_EDITED": "fa-pencil",
  "NEW_REMINDER": "fa-envelope-o"
};

/* @ngInject */
function HistoryIconDirective() {
  return {
    restrict: "AC",
    link: link
  };

  function link(scope, element) {
    element.addClass(icon[scope.summary.type]);
  }
}

module.exports = HistoryIconDirective;
