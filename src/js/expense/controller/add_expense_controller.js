"use strict";

var _ = require("underscore");

/* @ngInject */
function AddExpenseController(Expenses, Notifications) {
  var it = this;
  this.expense = {
    label: undefined,
    purchaserId: undefined,
    amount: undefined,
    participantsIds: [],
    description: undefined
  };

  this.addExpense = addExpense;

  function addExpense(event, expense) {
    delete it.errors;
    var expensePassedToResource = _.extend({eventId: event.id}, expense);
    Expenses.add(
      expensePassedToResource,
      function (addedExpense) {
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
    it.expense.purchaserId = undefined;
    it.expense.amount = undefined;
    it.expense.participantsIds = [];
    it.expense.description = undefined;
  }

  function extractMessagesFromError(error) {
    it.errors = (error.status === 400) ? error.data.errors : [{message: "ADD_EXPENSE_DEFAULT_ERROR"}];
  }
}

module.exports = AddExpenseController;