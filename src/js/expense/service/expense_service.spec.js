"use strict";

var sinon = require("sinon");

describe("The expense service", function () {
  var Expenses, service;

  beforeEach(function () {
    Expenses = {add: sinon.stub(), delete: sinon.stub(), fetch: sinon.stub(), fetchWithCount: sinon.stub()};
  });

  beforeEach(function () {
    var ExpenseService = require("./expense_service");
    service = new ExpenseService(Expenses);
  });

  it("should be defined", function () {
    service.should.be.defined;
  });

  it("should increment the skip value when an expense is created", function () {
    Expenses.add
      .withArgs("123", {})
      .resolves("addedExpense");

    var promise = service.addExpense("123", {});

    promise.then(function (data) {
      data.should.equal("addedExpense");
      service.skip.should.equal(1);
    });
  });

  it("should increment the expense count when an expense is created", function () {
    Expenses.add
      .withArgs("123", {})
      .resolves("addedExpense");

    var promise = service.addExpense("123", {});

    promise.then(function () {
      service.expenseCount.should.equal(1);
    });
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

  it("should decrement the skip value when an expense is deleted", function () {
    Expenses.delete
      .withArgs("123", "456")
      .resolves(null);

    var promise = service.deleteExpense("123", "456");

    promise.then(function () {
      service.skip.should.equal(-1);
    });
  });

  it("should decrement the expense count when an expense is deleted", function () {
    Expenses.delete
      .withArgs("123", "456")
      .resolves(null);

    var promise = service.deleteExpense("123", "456");

    promise.then(function () {
      service.expenseCount.should.equal(-1);
    });
  });

  it("should update the list of expenses when an expense is deleted", function () {
    Expenses.delete
      .withArgs("123", "456")
      .resolves(null);
    service.expenses.push({id: "456"});

    var promise = service.deleteExpense("123", "456");

    promise.then(function () {
      service.expenses.should.have.length(0);
    });
  });

  it("should reset the skip value on initialization", function () {
    Expenses.fetchWithCount
      .withArgs("eventId", 0, 4)
      .resolves({expenseCount: 2, expenses: [{id: "123"}]});
    service.skip = 3;

    var promise = service.initializeForEvent("eventId");

    promise.then(function () {
      service.skip.should.equal(0);
    });
  });

  it("should initialize the list with the received expenses", function () {
    Expenses.fetchWithCount
      .withArgs("eventId", 0, 4)
      .resolves({expenseCount: 2, expenses: [{id: "123"}]});

    var promise = service.initializeForEvent("eventId");

    promise.then(function () {
      service.expenseCount.should.equal(2);
      service.expenses.should.have.length(1);
      service.expenses[0].id.should.equal("123");
    });
  });

  it("should fetch a different batch every time", function () {
    Expenses.fetch
      .withArgs("eventId", 4, 4)
      .resolves([{id: "456"}]);

    var promise = service.loadMoreFrom("eventId");

    promise.then(function () {
      service.skip.should.equal(4);
    });
  });

  it("should store the expenses in ascendant order", function () {
    Expenses.fetch
      .withArgs("eventId", 4, 4)
      .resolves([{id: "456"}, {id: "789"}]);
    service.expenses.push({id: "123"});

    var promise = service.loadMoreFrom("eventId");

    promise.then(function () {
      service.expenses[0].id.should.equal("456");
      service.expenses[1].id.should.equal("789");
      service.expenses[2].id.should.equal("123");
    });
  });

  it("should be aware when all the expenses have been loaded", function () {
    service.expenseCount = 2;
    service.expenses.push({});

    service.expenses.push({});

    service.allLoaded.should.be.true;
  });
});
