"use strict";

var markup = {
  EVENT_CREATION: "{{'app.activity.create' | i18next}}",
  NEW_EXPENSE: "{{'app.activity.expense.label' | i18next}} {{operation.data}} {{'app.activity.expense.new' | i18next}}",
  EXPENSE_DELETED: "{{'app.activity.expense.label' | i18next}} {{operation.data}} {{'app.activity.expense.delete' | i18next}}",
  NEW_PARTICIPANT: "{{'app.activity.participant.label' | i18next}} {{operation.data}} {{'app.activity.participant.new' | i18next}}",
  PARTICIPANT_EDITED: "{{'app.activity.participant.label' | i18next}} {{operation.data}} {{'app.activity.participant.edit' | i18next}}",
  NEW_REMINDER: "{{'app.activity.reminder' | i18next}} {{operation.data}}"
};

/* @ngInject */
function OperationDirective($interpolate) {
  return {
    restrict: "E",
    scope: {operation: "="},
    templateUrl: "/templates/activity/operation",
    link: link
  };

  function link(scope) {
    scope.message = function () {
      var message = markup[scope.operation.type];
      return $interpolate(message)(scope);
    };
  }
}

module.exports = OperationDirective;
