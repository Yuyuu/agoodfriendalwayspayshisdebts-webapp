"use strict";

/* @ngInject */
function ExpensesListController($routeParams, Expenses, expenseService) {
  var model = this;

  model.expenseService = expenseService;

  activate();

  function activate() {
    return Expenses.fetch($routeParams.id).then(function (expenses) {
      model.expenses = expenses;
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
