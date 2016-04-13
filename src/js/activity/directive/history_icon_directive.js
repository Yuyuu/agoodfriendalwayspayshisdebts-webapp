"use strict";

var data = {
  "NEW_EXPENSE": {"class": "fa-plus-circle", tooltip: "app.history.expenses.added"},
  "EXPENSE_DELETED": {"class": "fa-minus-circle", tooltip: "app.history.expenses.deleted"},
  "NEW_PARTICIPANT": {"class": "fa-user-plus", tooltip: "app.history.participants.added"},
  "PARTICIPANT_EDITED": {"class": "fa-pencil", tooltip: "app.history.participants.edited"},
  "REMINDER_DELIVERED": {"class": "fa-check-circle", tooltip: "app.history.reminders.delivered"},
  "REMINDER_DROPPED": {"class": "fa-exclamation-triangle", tooltip: "app.history.reminders.dropped"}
};

/* @ngInject */
function HistoryIconDirective() {
  return {
    restrict: "AC",
    link: link
  };

  function link(scope, element, attributes) {
    var typeData = data[scope.summary.operationType];
    attributes.$set("title", scope.$eval("'" + typeData.tooltip + "' | i18next"));
    element.addClass(typeData.class);
  }
}

module.exports = HistoryIconDirective;
