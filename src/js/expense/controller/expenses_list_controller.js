"use strict";

/* @ngInject */
function ExpensesListController($stateParams, expenseService, notificationService) {
  var model = this;

  model.expenseService = expenseService;

  model.deleteExpense = deleteExpense;
  model.loadMore = loadMore;

  activate();

  function deleteExpense(eventId, expenseToDelete) {
    expenseService.deleteExpense({eventId: eventId, id: expenseToDelete.id}).then(function () {
      notificationService.success("EXPENSE_DELETED_SUCCESS");
    });
  }

  function loadMore() {
    expenseService.loadMoreFrom($stateParams.id);
  }

  function activate() {
    expenseService.initializeForEvent($stateParams.id);
  }
}

Object.defineProperties(ExpensesListController.prototype, {
  expenses: {
    enumerable: true,
    cofigurable: false,
    get: function () {
      return this.expenseService.expenses;
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