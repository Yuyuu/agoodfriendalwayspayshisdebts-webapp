"use strict";

/* @ngInject */
function ExpenseService() {
  var service = this;

  service.expenseCount = 0;
  service.expenses = [];

  service.addExpense = addExpense;

  function addExpense(expense) {
    service.expenseCount++;
    service.expenses.push(expense);
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
