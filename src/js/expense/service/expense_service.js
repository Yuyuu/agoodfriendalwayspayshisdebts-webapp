"use strict";

var _ = require("underscore");

/* @ngInject */
function ExpenseService() {
  var service = this;

  service.expenseCount = 0;
  service.expenses = [];

  service.addExpense = addExpense;
  service.deleteExpense = deleteExpense;

  function addExpense(expense) {
    service.expenses.push(expense);
    service.expenseCount++;
  }

  function deleteExpense(expenseToDelete) {
    var position = _.findIndex(service.expenses, function (expense) {
      return expense.id === expenseToDelete.id;
    });
    service.expenses.splice(position, 1);
    service.expenseCount--;
  }
}

Object.defineProperty(ExpenseService.prototype,
  "allLoaded", {
    enumerable: true,
    cofigurable: false,
    get: function () {
      return this.expenses.length === this.expenseCount;
    }
  }
);

module.exports = ExpenseService;
