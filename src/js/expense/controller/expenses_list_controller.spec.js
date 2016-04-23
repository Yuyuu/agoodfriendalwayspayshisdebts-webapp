"use strict";

var Bluebird = require("bluebird");
var sinon = require("sinon");

describe("The expenses list controller", function () {
  var confirmed, $stateParams, $modal, expenseService, notificationService, controller;

  beforeEach(function () {
    confirmed = true;
    $stateParams = {id: "1234"};
    expenseService = {
      expenses: [{label: "obsolete"}],
      deleteExpense: sinon.stub(),
      loadMoreFrom: sinon.stub(),
      initializeForEvent: sinon.stub()
    };
    expenseService.initializeForEvent
      .withArgs("1234")
      .resolves("hello");
    notificationService = {success: sinon.spy()};
    $modal = {open: sinon.stub()};
  });

  beforeEach(function () {
    var ExpensesListController = require("./expenses_list_controller");
    controller = new ExpensesListController($stateParams, $modal, expenseService, notificationService);
  });

  it("should be defined", function () {
    controller.should.be.defined;
  });

  it("should initialize the expenses upon activation", function () {
    controller.activation.then(function (data) {
      data.should.equal("hello");
    });
  });

  it("should load more expenses", function () {
    expenseService.loadMoreFrom
      .withArgs("1234")
      .resolves("hello");

    var promise = controller.loadMore();

    promise.then(function (data) {
      data.should.equal("hello");
    });
  });

  it("should emit a notification if the expense was successfully deleted", function () {
    $modal.open.returns({result: new Bluebird(function (resolve) {
      resolve(true);
    })});
    expenseService.deleteExpense
      .withArgs("1234", "123")
      .resolves(null);
    
    var promise = controller.deleteExpense({id: "123"});

    $modal.open.should.have.been.calledWith(sinon.match(function (options) {
      var expense = options.resolve.expense();
      return expense.id === "123";
    }));
    promise.then(function () {
      notificationService.success.should.have.been.calledWith("EXPENSE_DELETED_SUCCESS");
    });
  });

  it("should not delete the expense if the action is cancelled", function () {
    $modal.open.returns({result: new Bluebird(function (resolve) {
      resolve(false);
    })});
    expenseService.deleteExpense
      .withArgs("1234", "123")
      .resolves(null);

    var promise = controller.deleteExpense("eventId", {id: "123"});

    promise.then(function () {
      notificationService.success.should.not.have.been.called;
    });
  });
});
