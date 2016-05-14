"use strict";

/* @ngInject */
function ExpenseBrickController($stateParams, $modal, expenseService, notificationService) {
  var model = this;

  model.delete = deleteExpense;

  var modalOptions = {
    templateUrl: "/templates/modal/delete_expense_confirmation",
    controller: "DeleteExpenseController",
    controllerAs: "model",
    resolve: {
      expense: function () {
        return model.expense;
      }
    }
  };

  function deleteExpense() {
    var modalInstance = $modal.open(modalOptions);
    return modalInstance.result.then(function (confirmed) {
      if (confirmed) {
        return expenseService.deleteExpense($stateParams.id, model.expense).then(function () {
          notificationService.success("EXPENSE_DELETED_SUCCESS");
        });
      }
    });
  }
}

Object.defineProperty(ExpenseBrickController.prototype,
  "deleted", {
    enumerable: true,
    configurable: false,
    get: function () {
      return this.expense.state === "DELETED";
    }
  }
);

module.exports = ExpenseBrickController;
