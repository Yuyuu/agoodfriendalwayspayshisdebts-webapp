"use strict";

var _ = require("underscore");

/* @ngInject */
function ExpensesListController($routeParams, Expenses, expenseService) {
  var model = this;

  model.allLoaded = false;
  model.expenseService = expenseService;

  model.loadMore = loadMore;

  var expenseBatchSize = 5;
  var skip = 0;
  var eventExpenseCount = 0;

  activate();

  function loadMore() {
    skip += expenseBatchSize;
    Expenses.fetch($routeParams.id, skip, expenseBatchSize).then(function (expenses) {
      checkIfAllExpensesAreLoaded(expenses);
      _.each(expenses.reverse(), function (expense) {
        model.expenses.unshift(expense);
      });
    });
  }

  function checkIfAllExpensesAreLoaded(loadedExpenses) {
    var expenseCurrentlyLoadedCount = model.expenses.length + loadedExpenses.length;
    if (expenseCurrentlyLoadedCount >= eventExpenseCount) {
      model.allLoaded = true;
    }
  }

  function activate() {
    return Expenses.fetchWithCount($routeParams.id, 0, expenseBatchSize).then(function (data) {
      eventExpenseCount = data.expenseCount;
      checkIfAllExpensesAreLoaded(data.expenses);
      _.each(data.expenses, function (expense) {
        model.expenses.push(expense);
      });
      return model.expenses;
    });
  }
}

Object.defineProperty(ExpensesListController.prototype,
  "expenses", {
    enumerable: true,
    cofigurable: false,
    get: function () {
      return this.expenseService.expenses;
    }
  }
);

module.exports = ExpensesListController;