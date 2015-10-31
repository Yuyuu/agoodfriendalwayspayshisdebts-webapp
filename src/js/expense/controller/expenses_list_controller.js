"use strict";

/* @ngInject */
function ExpensesListController($stateParams, expenseService, notificationService, modalService) {
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
    var modalInstance = modalService.open(modalOptions);
    modalInstance.result.then(function (confirmed) {
      if (confirmed) {
        expenseService.deleteExpense($stateParams.id, expenseToDelete.id).then(function () {
          notificationService.success("EXPENSE_DELETED_SUCCESS");
        });
      }
    });
  }

  function loadMore() {
    model.loading = true;
    expenseService.loadMoreFrom($stateParams.id).finally(function () {
      model.loading = false;
    });
  }

  function activate() {
    model.loading = true;
    expenseService.initializeForEvent($stateParams.id).finally(function () {
      model.loading = false;
    });
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