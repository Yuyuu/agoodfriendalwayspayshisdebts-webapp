"use strict";

var _ = require("underscore");

/* @ngInject */
function ExpenseService(Expenses) {
  var service = this;

  service.expenseCount = 0;
  service.expenses = [];
  service.skip = 0;

  service.addExpense = addExpense;
  service.deleteExpense = deleteExpense;
  service.initializeForEvent = initializeForEvent;
  service.loadMoreFrom = loadMoreFrom;

  var expenseBatchSize = 3;

  function addExpense(expense) {
    return Expenses.add(expense).then(function (addedExpense) {
      service.skip++;
      service.expenses.push(addedExpense);
      service.expenseCount++;
      return addedExpense;
    });
  }

  function deleteExpense(expenseToDelete) {
    return Expenses.delete(expenseToDelete).then(function () {
      service.skip--;
      var position = _.findIndex(service.expenses, function (expense) {
        return expense.id === expenseToDelete.id;
      });
      service.expenses.splice(position, 1);
      service.expenseCount--;
    });
  }

  function initializeForEvent(eventId) {
    return Expenses.fetchWithCount(eventId, 0, expenseBatchSize).then(function (data) {
      service.skip = 0;
      service.expenseCount = data.expenseCount;
      service.expenses = data.expenses;
      return data;
    });
  }

  function loadMoreFrom(eventId) {
    service.skip += expenseBatchSize;
    return Expenses.fetch(eventId, service.skip, expenseBatchSize).then(function (expenses) {
      _.each(expenses.reverse(), function (expense) {
        service.expenses.unshift(expense);
      });
      return expenses;
    });
  }
}

Object.defineProperty(ExpenseService.prototype,
  "allLoaded", {
    enumerable: true,
    cofigurable: false,
    get: function () {
      return this.expenses.length === this.expenseCount;
    }
  }
);

module.exports = ExpenseService;
