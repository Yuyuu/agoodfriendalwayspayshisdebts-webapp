"use strict";

var entity = {
  EVENT_CREATION: "app.activity.event.label",
  NEW_EXPENSE: "app.activity.expense.label",
  EXPENSE_DELETED: "app.activity.expense.label",
  NEW_PARTICIPANT: "app.activity.participant.label",
  PARTICIPANT_EDITED: "app.activity.participant.label",
  REMINDER_DELIVERED: "app.activity.reminder.label",
  REMINDER_DROPPED: "app.activity.reminder.label"
};

var operation = {
  EVENT_CREATION: "app.activity.event.create",
  NEW_EXPENSE: "app.activity.expense.new",
  EXPENSE_DELETED: "app.activity.expense.delete",
  NEW_PARTICIPANT: "app.activity.participant.new",
  PARTICIPANT_EDITED: "app.activity.participant.edit",
  REMINDER_DELIVERED: "app.activity.reminder.deliver",
  REMINDER_DROPPED: "app.activity.reminder.drop"
};

/* @ngInject */
function OperationDirective() {
  return {
    restrict: "E",
    scope: {operation: "="},
    templateUrl: "/templates/activity/operation",
    link: link
  };

  function link(scope) {
    scope.entity = function () {
      return entity[scope.operation.type];
    };

    scope.complement = function () {
      return operation[scope.operation.type];
    };
  }
}

module.exports = OperationDirective;
