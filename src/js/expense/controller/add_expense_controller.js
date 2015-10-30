"use strict";

/* @ngInject */
function AddExpenseController($stateParams, expenseService, notificationService) {
  var model = this;

  model.expense = {};

  model.addExpense = addExpense;

  function addExpense(expense) {
    delete model.errors;
    expenseService.addExpense($stateParams.id, expense)
      .then(resetFormAndShowNotification)
      .catch(extractErrors);
  }

  function resetFormAndShowNotification() {
    resetForm();
    notificationService.success("EXPENSE_ADDED_SUCCESS");
  }

  function extractErrors(errors) {
    model.errors = errors;
  }

  function resetForm() {
    if (model.form) {
      model.form.$setPristine();
      model.form.$setUntouched();
    }
    delete model.expense.label;
    delete model.expense.purchaserUuid;
    delete model.expense.amount;
    model.expense.participantsUuids = [];
    delete model.expense.description;
  }
}

module.exports = AddExpenseController;