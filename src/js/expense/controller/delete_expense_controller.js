"use strict";

/* @ngInject */
function DeleteExpenseController($modalInstance, expense) {
  var model = this;

  model.expense = expense;

  model.close = close;

  function close(confirmed) {
    $modalInstance.close(confirmed);
  }
}

module.exports = DeleteExpenseController;
