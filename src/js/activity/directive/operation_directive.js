"use strict";

var data = {
  EVENT_CREATION: {label: "app.activity.event.label", complement: "app.activity.event.create", icon: "fa-thumb-tack"},
  NEW_EXPENSE: {label: "app.activity.expense.label", complement: "app.activity.expense.new", icon: "fa-credit-card"},
  EXPENSE_DELETED: {label: "app.activity.expense.label", complement: "app.activity.expense.delete", icon: "fa-credit-card"},
  NEW_PARTICIPANT: {label: "app.activity.participant.label", complement: "app.activity.participant.new", icon: "fa-user"},
  PARTICIPANT_EDITED: {label: "app.activity.participant.label", complement: "app.activity.participant.edit", icon: "fa-user"},
  REMINDER_DELIVERED: {label: "app.activity.reminder.label", complement: "app.activity.reminder.deliver", icon: "fa-envelope-o"},
  REMINDER_DROPPED: {label: "app.activity.reminder.label", complement: "app.activity.reminder.drop", icon: "fa-envelope-o"}
};

/* @ngInject */
function OperationDirective() {
  return {
    restrict: "E",
    scope: {operation: "<"},
    templateUrl: "/templates/activity/operation",
    link: link
  };

  function link(scope) {
    var typeData = data[scope.operation.operationType];

    scope.label = function () {
      return typeData.label;
    };

    scope.complement = function () {
      return typeData.complement;
    };

    scope.icon = function () {
      return typeData.icon;
    };
  }
}

module.exports = OperationDirective;
