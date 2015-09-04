"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller responsible for listing the expenses of an event", function () {
  var expense, $stateParams, Expenses, expenseService, controller;

  beforeEach(function () {
    expense = {label: "expense", amount: 3.4};
    $stateParams = {id: "1234"};
    Expenses = {fetchWithCount: sinon.stub(), fetch: sinon.stub()};
    Expenses.fetchWithCount.returns({then: function (callback) {
      return callback.call(null, {expenseCount: 2, expenses: [expense]});
    }});
    Expenses.fetch.returns({then: function (callback) {
      return callback.call(null, [expense]);
    }});
    expenseService = {expenses: [{label: "obsolete"}]};
  });

  beforeEach(function () {
    var ExpensesListController = require("./expenses_list_controller");
    controller = new ExpensesListController($stateParams, Expenses, expenseService);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should reload the expenses and the count on activation", function () {
    expect(controller.expenses[0]).to.deep.equal({label: "expense", amount: 3.4});
  });

  it("stores the expenses ascendant order", function () {
    Expenses.fetch.returns({then: function (callback) {
      return callback.call(null, [{label: "expense2"}, {label: "expense3"}]);
    }});
    controller.loadMore();

    expect(controller.expenses[0].label).to.equal("expense2");
    expect(controller.expenses[1].label).to.equal("expense3");
    expect(controller.expenses[2].label).to.equal("expense");
  });
});
