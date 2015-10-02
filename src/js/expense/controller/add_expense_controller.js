"use strict";

/* @ngInject */
function AddExpenseController($stateParams, expenseService, notificationService) {
  var model = this;

  model.expense = {
    label: undefined,
    purchaserUuid: undefined,
    amount: undefined,
    participantsUuids: [],
    description: undefined
  };

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
    model.expense.label = undefined;
    model.expense.purchaserUuid = undefined;
    model.expense.amount = undefined;
    model.expense.participantsUuids = [];
    model.expense.description = undefined;
  }

  function extractMessagesFromError(error) {
    model.errors = (error.status === 400) ? error.data.errors : [{message: "ADD_EXPENSE_DEFAULT_ERROR"}];
  }
}

module.exports = AddExpenseController;