"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("The service holding the expenses of the current event", function () {
  var service;

  beforeEach(function () {
    var ExpenseService = require("./expense_service");
    service = new ExpenseService();
  });

  it("should be defined", function () {
    expect(service).to.be.defined;
  });

  it("should increase the expense count when an expense is added", function () {
    service.addExpense({});

    expect(service.expenseCount).to.equal(1);
  });

  it("should be aware when all the expenses have been loaded", function () {
    service.expenseCount = 1;
    service.addExpense({});

    expect(service.allLoaded).to.be.false;

    service.expenses.push({});

    expect(service.allLoaded).to.be.true;
  });

  it("should remove an expense from the list", function () {
    service.expenses.push({id: "123"});

    service.deleteExpense({id: "123"});

    expect(service.expenses).to.have.length(0);
  });

  it("should lower the count when deleting an expense", function () {
    service.expenses.push({id: "123"});
    service.expenseCount = 1;

    service.deleteExpense({id: "123"});

    expect(service.expenseCount).to.equal(0);
  });
});