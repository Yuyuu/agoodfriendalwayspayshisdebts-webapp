"use strict";

var _ = require("underscore");

/* @ngInject */
function AddExpenseController(Expenses, Notifications) {
  var it = this;
  this.expense = {
    label: undefined,
    purchaserUuid: undefined,
    amount: undefined,
    participantsUuids: [],
    description: undefined
  };

  this.addExpense = addExpense;

  function addExpense(event, expense) {
    delete it.errors;
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
    if (it.form) {
      it.form.$setPristine();
      it.form.$setUntouched();
    }
    it.expense.label = undefined;
    it.expense.purchaserUuid = undefined;
    it.expense.amount = undefined;
    it.expense.participantsUuids = [];
    it.expense.description = undefined;
  }

  function extractMessagesFromError(error) {
    it.errors = (error.status === 400) ? error.data.errors : [{message: "ADD_EXPENSE_DEFAULT_ERROR"}];
  }
}

module.exports = AddExpenseController;