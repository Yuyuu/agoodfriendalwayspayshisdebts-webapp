"use strict";

/* @ngInject */
function ExpensesListController($stateParams, expenseService, masonryService) {
  var model = this;

  model._expenseService = expenseService;
  model.showDeletedExpenses = false;

  model.loadMore = loadMore;
  model.reloadBricks = reloadBricks;

  activate();

  function loadMore() {
    model.loading = true;
    return expenseService.loadMore().finally(stopLoading);
  }

  function reloadBricks() {
    masonryService.reloadBricks();
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