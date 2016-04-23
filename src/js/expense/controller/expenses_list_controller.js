"use strict";

/* @ngInject */
function ExpensesListController($stateParams, $modal, expenseService, notificationService) {
  var model = this;

  model.expenseService = expenseService;

  model.deleteExpense = deleteExpense;
  model.loadMore = loadMore;

  var modalOptions = {
    templateUrl: "/templates/modal/delete_expense_confirmation",
    controller: "DeleteExpenseController",
    controllerAs: "model"
  };

  activate();

  function deleteExpense(expenseToDelete) {
    modalOptions.resolve = {expense: function () {
      return expenseToDelete;
    }};
    var modalInstance = $modal.open(modalOptions);
    return modalInstance.result.then(function (confirmed) {
      if (confirmed) {
        return expenseService.deleteExpense($stateParams.id, expenseToDelete.id).then(function () {
          notificationService.success("EXPENSE_DELETED_SUCCESS");
        });
      }
    });
  }

  function loadMore() {
    return expenseService.loadMoreFrom($stateParams.id);
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