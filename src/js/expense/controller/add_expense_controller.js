'use strict';

export default class AddExpenseController {

  /* @ngInject */
  constructor($stateParams, expenseService, notificationService) {
    this._$stateParams = $stateParams;
    this._expenseService = expenseService;
    this._notificationService = notificationService;
    this.expense = {};
  }

  addExpense(expense) {
    delete this.errors;
    this._expenseService.addExpense(this._$stateParams.id, expense)
      .then(() => {
        this._resetForm();
        this._notificationService.success('EXPENSE_ADDED_SUCCESS');
      })
      .catch(errors => this.errors = errors);
  }

  _resetForm() {
    if (this.form) {
      this.form.$setPristine();
      this.form.$setUntouched();
    }
    delete this.expense.label;
    delete this.expense.purchaserUuid;
    delete this.expense.amount;
    this.expense.participantsUuids = [];
    delete this.expense.description;
  }
}
