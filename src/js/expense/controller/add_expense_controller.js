"use strict";

/* @ngInject */
function AddExpenseController($stateParams, expenseService, notificationService) {
  var model = this;

  model.expense = {};

  model.addExpense = addExpense;

  function addExpense(expense) {
    delete model.errors;
    expenseService.addExpense($stateParams.id, expense).then(function () {
      clearForm();
      notificationService.success("EXPENSE_ADDED_SUCCESS");
    }).catch(extractMessagesFromError);
  }

  function clearForm() {
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

  function extractMessagesFromError(error) {
    model.errors = (error.status === 400) ? error.data.errors : [{message: "ADD_EXPENSE_DEFAULT_ERROR"}];
  }
}

module.exports = AddExpenseController;