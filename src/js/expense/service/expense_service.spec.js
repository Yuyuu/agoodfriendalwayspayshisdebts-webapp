"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The service holding the expenses of the current event", function () {
  var Expenses, service;

  beforeEach(function () {
    Expenses = expensesResourceStub();
  });

  beforeEach(function () {
    var ExpenseService = require("./expense_service");
    service = new ExpenseService(Expenses);
  });

  it("should be defined", function () {
    expect(service).to.be.defined;
  });

  it("should increment the skip value when an expense is created", function () {
    service.addExpense({});

    expect(service.skip).to.equal(1);
  });

  it("should increment the expense count when an expense is created", function () {
    service.addExpense({});

    expect(service.expenseCount).to.equal(1);
  });

  it("should update the list of expenses when an expense is created", function () {
    service.addExpense({id: "123"});

    expect(service.expenses).to.have.length(1);
    expect(service.expenses[0].id).to.equal("123");
  });

  it("should decrement the skip value when an expense is deleted", function () {
    service.deleteExpense({});

    expect(service.skip).to.equal(-1);
  });

  it("should decrement the expense count when an expense is deleted", function () {
    service.deleteExpense({});

    expect(service.expenseCount).to.equal(-1);
  });

  it("should update the list of expenses when an expense is deleted", function () {
    var expense = {id: "123"};
    service.expenses.push(expense);

    service.deleteExpense(expense);

    expect(service.expenses).to.have.length(0);
  });

  it("should reset the skip value on initialization", function () {
    service.skip = 3;

    service.initializeForEvent("eventId");

    expect(service.skip).to.equal(0);
  });

  it("should initialize the list with the received expenses", function () {
    service.initializeForEvent("eventId");

    expect(service.expenseCount).to.equal(2);
    expect(service.expenses).to.have.length(1);
    expect(service.expenses[0].id).to.equal("123");
  });

  it("should fetches a different batch every time", function () {
    service.loadMoreFrom("eventId");

    expect(service.skip).to.equal(3);
  });

  it("should store the expenses in ascendant order", function () {
    Expenses.fetch.returns({then: function (callback) {
      return callback.call(null, [{id: "456"}, {id: "789"}]);
    }});
    service.expenses.push({id: "123"});

    service.loadMoreFrom("eventId");

    expect(service.expenses[0].id).to.equal("456");
    expect(service.expenses[1].id).to.equal("789");
    expect(service.expenses[2].id).to.equal("123");
  });

  it("should be aware when all the expenses have been loaded", function () {
    service.expenseCount = 2;
    service.expenses.push({});

    service.expenses.push({});

    expect(service.allLoaded).to.be.true;
  });
});

function expensesResourceStub() {
  var resource = {add: sinon.stub(), delete: sinon.stub(), fetch: sinon.stub(), fetchWithCount: sinon.stub()};
  resource.add.returns({then: function (callback) {
    return callback.call(null, {});
  }});
  resource.add.withArgs({id: "123"}).returns({then: function (callback) {
    return callback.call(null, {id: "123"});
  }});
  resource.delete.returns({then: function (callback) {
    return callback.call(null);
  }});
  resource.fetchWithCount.returns({then: function (callback) {
    return callback.call(null, {expenseCount: 2, expenses: [{id: "123"}]});
  }});
  resource.fetch.returns({then: function (callback) {
    return callback.call(null, [{id: "456"}]);
  }});
  return resource;
}