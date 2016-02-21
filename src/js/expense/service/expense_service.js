'use strict';

import findIndex from 'lodash/findIndex';

export default class ExpenseService {

  /* @ngInject */
  constructor(Expenses) {
    this._Expenses = Expenses;
    this.expenseCount = 0;
    this.expenses = [];
    this.skip = 0;
    this.expenseBatchSize = 4;
  }

  addExpense(eventId, expense) {
    return this._Expenses.add(eventId, expense).then(addedExpense => {
      this.skip++;
      this.expenses.push(addedExpense);
      this.expenseCount++;
      return addedExpense;
    });
  }

  deleteExpense(eventId, expenseId) {
    return this._Expenses.delete(eventId, expenseId).then(() => {
      this.skip--;
      let position = findIndex(this.expenses, expense => expense.id === expenseId);
      this.expenses.splice(position, 1);
      this.expenseCount--;
    });
  }

  initializeForEvent(eventId) {
    // So expenses are not displayed two times before masonry reloads after route change
    this.expenses = [];
    return this._Expenses.fetchWithCount(eventId, 0, this.expenseBatchSize).then(data => {
      this.skip = 0;
      this.expenseCount = data.expenseCount;
      this.expenses = data.expenses;
      return data;
    });
  }

  loadMoreFrom(eventId) {
    this.skip += this.expenseBatchSize;
    return this._Expenses.fetch(eventId, this.skip, this.expenseBatchSize).then(expenses => {
      expenses.reverse().forEach(expense => this.expenses.unshift(expense));
      return expenses;
    });
  }

  get allLoaded() {
    return this.expenses.length === this.expenseCount;
  }
}
