"use strict";

/* @ngInject */
function ExpensesListController($stateParams, expenseService) {
  var model = this;

  model._expenseService = expenseService;

  model.loadMore = loadMore;

  activate();

  function loadMore() {
    model.loading = true;
    return expenseService.loadMore().finally(stopLoading);
  }

  function activate() {
    model.loading = true;
    model.activation = expenseService.initializeForEvent($stateParams.id).finally(stopLoading);
  }
  
  function stopLoading() {
    model.loading = false;
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