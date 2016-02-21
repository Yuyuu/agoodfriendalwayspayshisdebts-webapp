'use strict';

export default class ExpensesListController {

  /* @ngInject */
  constructor($stateParams, $modal, expenseService, notificationService) {
    this._$stateParams = $stateParams;
    this._$modal = $modal;
    this._expenseService = expenseService;
    this._notificationService = notificationService;
    this._modalOptions = {
      templateUrl: '/templates/modal/delete_expense_confirmation',
      controller: 'DeleteExpenseController',
      controllerAs: 'model'
    };
    this._activate();
  }

  deleteExpense(expenseToDelete) {
    this._modalOptions.resolve = {expense: () => expenseToDelete};
    let modalInstance = this._$modal.open(this._modalOptions);
    modalInstance.result.then(confirmed => {
      if (confirmed) {
        this._expenseService.deleteExpense(this._$stateParams.id, expenseToDelete.id).then(() =>
          this._notificationService.success('EXPENSE_DELETED_SUCCESS')
        );
      }
    });
  }

  loadMore() {
    this._expenseService.loadMoreFrom(this._$stateParams.id);
  }

  get expenses() {
    return this._expenseService.expenses;
  }

  get allLoaded() {
    return this._expenseService.allLoaded;
  }

  _activate() {
    this._expenseService.initializeForEvent(this._$stateParams.id);
  }
}
