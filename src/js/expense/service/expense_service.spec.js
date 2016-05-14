"use strict";

var sinon = require("sinon");

describe("The expense service", function () {
  var Expenses, service;

  beforeEach(function () {
    Expenses = {
      add: sinon.stub(),
      delete: sinon.stub(),
      fetch: sinon.stub(),
      next: sinon.stub(),
      hasNext: sinon.stub()
    };
  });

  beforeEach(function () {
    var ExpenseService = require("./expense_service");
    service = new ExpenseService(Expenses);
  });

  it("should be defined", function () {
    service.should.be.defined;
  });

  it("should update the list of expenses when an expense is created", function () {
    Expenses.add
      .withArgs("123", {id: "123"})
      .resolves({id: "123"});

    var promise = service.addExpense("123", {id: "123"});

    promise.then(function () {
      service.expenses.should.have.length(1);
      service.expenses[0].id.should.equal("123");
    });
  });

  it("should update the list of expenses when an expense is deleted", function () {
    Expenses.delete
      .withArgs("123", "456")
      .resolves({hello: "world", state: "DELETED"});
    service.expenses.push({id: "456", state: "state"});

    var promise = service.deleteExpense("123", service.expenses[0]);

    promise.then(function () {
      service.expenses[0].id.should.equal("456");
      service.expenses[0].state.should.equal("DELETED");
      service.expenses[0].hello.should.equal("world");
    });
  });

  it("should initialize the list with the received expenses", function () {
    Expenses.fetch
      .withArgs("eventId")
      .resolves([{id: "123"}]);

    var promise = service.initializeForEvent("eventId");

    promise.then(function () {
      service.expenses.should.have.length(1);
      service.expenses[0].id.should.equal("123");
    });
  });

  it("should fetch and store the next page", function () {
    Expenses.next
      .resolves([{id: "456"}, {id: "789"}]);
    service.expenses.push({id: "123"});

    var promise = service.loadMore();

    promise.then(function () {
      service.expenses[0].id.should.equal("123");
      service.expenses[1].id.should.equal("456");
      service.expenses[2].id.should.equal("789");
    });
  });

  it("should be aware when all the expenses have been loaded", function () {
    Expenses.hasNext.returns(false);
    service.allLoaded.should.be.true;
  });
});
