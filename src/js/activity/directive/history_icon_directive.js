"use strict";

var icon = {
  "NEW_EXPENSE": "glyphicon-plus-sign",
  "EXPENSE_DELETED": "glyphicon-minus-sign",
  "NEW_PARTICIPANT": "glyphicon-plus-sign",
  "PARTICIPANT_EDITED": "glyphicon-pencil",
  "NEW_REMINDER": "glyphicon-envelope"
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
