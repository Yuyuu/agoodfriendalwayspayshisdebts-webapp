"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller responsible for listing the expenses of an event", function () {
  var expense, $stateParams, Expenses, expenseService, notificationService, controller;

  beforeEach(function () {
    expense = {id: "1234", label: "expense", amount: 3.4};
    $stateParams = {id: "1234"};
    Expenses = {fetchWithCount: sinon.stub(), fetch: sinon.stub(), delete: sinon.stub()};
    Expenses.fetchWithCount.returns({then: function (callback) {
      return callback.call(null, {expenseCount: 2, expenses: [expense]});
    }});
    Expenses.fetch.returns({then: function (callback) {
      return callback.call(null, [expense]);
    }});
    Expenses.delete.returns({then: function (callback) {
      return callback.call(null);
    }});
    expenseService = {expenses: [{label: "obsolete"}], deleteExpense: sinon.spy()};
    notificationService = {success: sinon.spy()};
  });

  beforeEach(function () {
    var ExpensesListController = require("./expenses_list_controller");
    controller = new ExpensesListController($stateParams, Expenses, expenseService, notificationService);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should reload the expenses and the count on activation", function () {
    expect(controller.expenses[0]).to.deep.equal({id: "1234", label: "expense", amount: 3.4});
  });

  it("should store the expenses ascendant order", function () {
    Expenses.fetch.returns({then: function (callback) {
      return callback.call(null, [{label: "expense2"}, {label: "expense3"}]);
    }});
    controller.loadMore();

    expect(controller.expenses[0].label).to.equal("expense2");
    expect(controller.expenses[1].label).to.equal("expense3");
    expect(controller.expenses[2].label).to.equal("expense");
  });

  it("should remove an expense from the current expenses when it is deleted", function () {
    controller.deleteExpense("eventId", expense);

    expect(expenseService.deleteExpense).to.have.been.calledWith(expense);
  });

  it("should emit a notification if the expense was successfully deleted", function () {
    controller.deleteExpense("eventId", expense);

    expect(notificationService.success).to.have.been.calledWith("EXPENSE_DELETED_SUCCESS");
  });

  it("should lower the skip value when an expense with a position lower than the skip is deleted", function () {
    controller.deleteExpense("eventId", expense);

    controller.loadMore();

    expect(Expenses.fetch).to.have.been.calledWith("1234", 4, 5);
  });
});
