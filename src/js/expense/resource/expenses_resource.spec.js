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
      .withArgs("/api/events/1234/expenses?page=1")
      .resolves({data: {totalCount: 1, items: [{label: "expense", amount: 3.4}]}, links: {}});

    var expensesPromise = resource.fetch("1234");

    expensesPromise.then(function (result) {
      result.should.deep.include.members([{label: "expense", amount: 3.4}]);
    });
  });

  it("should store the next url", function () {
    restService.get
      .withArgs("/api/events/1234/expenses?page=1")
      .resolves({data: {items: []}, links: {next: {url: "/path"}}});
    restService.get
      .withArgs("/api/path")
      .resolves({data: {items: []}, links: {}});

    var expensesPromise = resource.fetch("1234");

    resource.hasNext().should.be.false;
    expensesPromise.then(function () {
      resource.hasNext().should.be.true;
      resource.next();
      restService.get.should.have.been.calledWith("/api/path", {withLinkObject: true});
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
      .withArgs("/api/events/1234/expenses?format=meta&page=1")
      .resolves({data: {totalCount: 1, items: [{label: "expense", id: "5678"}]}, links: {}});

    var responsePromise = resource.metadata("1234");

    responsePromise.then(function (expensesMetadata) {
      expensesMetadata.should.have.length(1);
      expensesMetadata[0].should.deep.equal({id: "5678", label: "expense"});
    });
  });

  it("should store the next metadata url", function () {
    restService.get
      .withArgs("/api/events/1234/expenses?format=meta&page=1")
      .resolves({data: {items: []}, links: {next: {url: "/path"}}});
    restService.get
      .withArgs("/api/path")
      .resolves({data: {items: []}, links: {}});

    var expensesPromise = resource.metadata("1234");

    resource.hasNextMetadata().should.be.false;
    expensesPromise.then(function () {
      resource.hasNextMetadata().should.be.true;
      resource.nextMetadata();
      restService.get.should.have.been.calledWith("/api/path", {withLinkObject: true});
    });
  });
});