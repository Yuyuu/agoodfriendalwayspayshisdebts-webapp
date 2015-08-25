"use strict";

var _ = require("underscore");

/* @ngInject */
function AddExpenseController(Expenses, Notifications) {
  var model = this;

  model.expense = {
    label: undefined,
    purchaserUuid: undefined,
    amount: undefined,
    participantsUuids: [],
    description: undefined
  };

  model.addExpense = addExpense;

  function addExpense(event, expense) {
    delete model.errors;
    var expensePassedToResource = _.extend({eventId: event.id}, expense);
    Expenses.add(
      expensePassedToResource,
      function () {
        var addedExpense = _.omit(expense, "purchaserUuid", "participantsUuids");
        addedExpense.purchaserId = expense.purchaserUuid;
        addedExpense.participantsIds = expense.participantsUuids;
        clearForm();
        event.expenses.push(addedExpense);
        Notifications.success("EXPENSE_ADDED_SUCCESS");
      },
      extractMessagesFromError
    );
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