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
      _.each(expenses.reverse(), function (expense) {
        model.expenses.unshift(expense);
      });
      checkIfAllExpensesAreLoaded();
    });
  }

  function checkIfAllExpensesAreLoaded() {
    if (model.expenses.length >= eventExpenseCount) {
      model.allLoaded = true;
    }
  }

  function activate() {
    return Expenses.fetchWithCount($routeParams.id, 0, expenseBatchSize).then(function (data) {
      eventExpenseCount = data.expenseCount;
      model.expenses = data.expenses;
      checkIfAllExpensesAreLoaded();
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
    },
    set: function (expenses) {
      this.expenseService.expenses = expenses;
    }
  }
);

module.exports = ExpensesListController;