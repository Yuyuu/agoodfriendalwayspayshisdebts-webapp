"use strict";

var assign = require("lodash/assign");

/* @ngInject */
function ExpenseService(Expenses) {
  var service = this;

  service._Expenses = Expenses;
  service.expenses = [];

  service.addExpense = addExpense;
  service.deleteExpense = deleteExpense;
  service.initializeForEvent = initializeForEvent;
  service.loadMore = loadMore;

  function addExpense(eventId, expense) {
    return Expenses.add(eventId, expense).then(function (addedExpense) {
      service.expenses.unshift(addedExpense);
      return addedExpense;
    });
  }

  function deleteExpense(eventId, expense) {
    return Expenses.delete(eventId, expense.id).then(function (updatedExpense) {
      assign(expense, updatedExpense);
      return updatedExpense;
    });
  }

  function initializeForEvent(eventId) {
    // So expenses are not displayed two times before masonry reloads after route change
    service.expenses = [];
    return Expenses.fetch(eventId).then(function (expenses) {
      service.expenses = expenses;
      return expenses;
    });
  }

  function loadMore() {
    return Expenses.next().then(function (expenses) {
      service.expenses.push.apply(service.expenses, expenses);
      return expenses;
    });
  }
}

Object.defineProperty(ExpenseService.prototype,
  "allLoaded", {
    enumerable: true,
    configurable: false,
    get: function () {
      return !this._Expenses.hasNext();
    }
  }
);

module.exports = ExpenseService;
