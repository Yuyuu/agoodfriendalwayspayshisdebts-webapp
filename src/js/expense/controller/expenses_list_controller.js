"use strict";

/* @ngInject */
function ExpensesListController($stateParams, expenseService) {
  var model = this;

  model._expenseService = expenseService;

  model.loadMore = loadMore;

  activate();

  function loadMore() {
    return expenseService.loadMore();
  }

  function activate() {
    model.activation = expenseService.initializeForEvent($stateParams.id);
  }
}

Object.defineProperties(ExpensesListController.prototype, {
  expenses: {
    enumerable: true,
    cofigurable: false,
    get: function () {
      return this._expenseService.expenses;
    }
  },
  allLoaded: {
    enumerable: true,
    cofigurable: false,
    get: function () {
      return this._expenseService.allLoaded;
    }
  }
});

module.exports = ExpensesListController;