"use strict";

var sinon = require("sinon");

describe("The expenses resource", function () {
  var restService, resource;

  beforeEach(function () {
    restService = {post: sinon.stub(), get: sinon.stub(), delete: sinon.stub()};
  });

  beforeEach(function () {
    var Expenses = require("./expenses_resource");
    resource = new Expenses(restService);
  });

  it("should be defined", function () {
    resource.should.be.defined;
  });

  it("should retrieve the expenses", function () {
    restService.get
      .withArgs("/api/events/1234/expenses?skip=0&limit=2")
      .resolves({expenseCount: 1, expenses: [{label: "expense", amount: 3.4}]});

    var expensesPromise = resource.fetch("1234", 0, 2);

    expensesPromise.then(function (result) {
      result.should.deep.include.members([{label: "expense", amount: 3.4}]);
    });
  });

  it("should retrieve the expenses and the total count", function () {
    restService.get
      .withArgs("/api/events/1234/expenses?skip=0&limit=2")
      .resolves({expenseCount: 1, expenses: [{label: "expense", amount: 3.4}]});

    var expensesPromise = resource.fetchWithCount("1234", 0, 2);

    expensesPromise.then(function (result) {
      result.expenseCount.should.equal(1);
      result.expenses.should.deep.include.members([{label: "expense", amount: 3.4}]);
    });
  });

  it("should post an expense and return it", function () {
    restService.post
      .withArgs("/api/events/123/expenses", {})
      .resolves({label: "expense", amount: 3.4});

    var expensePromise = resource.add("123", {});

    expensePromise.then(function (expense) {
      expense.should.deep.equal({label: "expense", amount: 3.4});
    });
  });

  it("should delete an expense", function () {
    restService.delete
      .withArgs("/api/events/1234/expenses/5678")
      .resolves({hello: "world"});

    var responsePromise = resource.delete("1234", "5678");

    responsePromise.then(function (data) {
      data.hello.should.equal("world");
    });
  });

  it("should retrieve the metadata of the expenses", function () {
    restService.get
      .withArgs("/api/events/1234/expenses?format=meta")
      .resolves([{id: "5678", label: "expense"}, {}]);

    var responsePromise = resource.metadata("1234");

    responsePromise.then(function (expensesMetadata) {
      expensesMetadata.should.have.length(2);
      expensesMetadata[0].should.deep.equal({id: "5678", label: "expense"});
    });
  });
});