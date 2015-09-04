"use strict";

var _ = require("underscore");

/* @ngInject */
function ExpensesListController($stateParams, Expenses, expenseService) {
  var model = this;

  model.expenseService = expenseService;

  model.loadMore = loadMore;

  var expenseBatchSize = 5;
  var skip = 0;

  activate();

  function loadMore() {
    skip += expenseBatchSize;
    Expenses.fetch($stateParams.id, skip, expenseBatchSize).then(function (expenses) {
      _.each(expenses.reverse(), function (expense) {
        model.expenses.unshift(expense);
      });
    });
  }

  function activate() {
    Expenses.fetchWithCount($stateParams.id, 0, expenseBatchSize).then(function (data) {
      expenseService.expenseCount = data.expenseCount;
      model.expenses = data.expenses;
    });
  }
}

Object.defineProperties(ExpensesListController.prototype, {
  expenses: {
    enumerable: true,
    cofigurable: false,
    get: function () {
      return this.expenseService.expenses;
    },
    set: function (expenses) {
      this.expenseService.expenses = expenses;
    }
  },
  allLoaded: {
    enumerable: true,
    cofigurable: false,
    get: function () {
      return this.expenseService.allLoaded;
    }
  }
});

module.exports = ExpensesListController;