"use strict";

var sinon = require("sinon");

describe("The expenses list controller", function () {
  var $stateParams, expenseService, controller;

  beforeEach(function () {
    $stateParams = {id: "1234"};
    expenseService = {
      expenses: [{label: "obsolete"}],
      loadMore: sinon.stub(),
      initializeForEvent: sinon.stub()
    };
    expenseService.initializeForEvent
      .withArgs("1234")
      .resolves("hello");
  });

  beforeEach(function () {
    var ExpensesListController = require("./expenses_list_controller");
    controller = new ExpensesListController($stateParams, expenseService);
  });

  it("should be defined", function () {
    controller.should.be.defined;
  });

  it("should initialize the expenses upon activation", function () {
    controller.loading.should.be.true;
    controller.activation.then(function (data) {
      data.should.equal("hello");
      controller.loading.should.be.false;
    });
  });

  it("should load more expenses", function () {
    expenseService.loadMore
      .resolves("hello");

    var promise = controller.loadMore();

    controller.loading.should.be.true;
    promise.then(function (data) {
      data.should.equal("hello");
      controller.loading.should.be.false;
    });
  });
});
