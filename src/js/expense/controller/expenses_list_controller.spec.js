"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller responsible for listing the expenses of an event", function () {
  var confirmed, $stateParams, expenseService, notificationService, modalService, controller;

  beforeEach(function () {
    confirmed = true;
    $stateParams = {id: "1234"};
    expenseService = {
      expenses: [{label: "obsolete"}],
      deleteExpense: sinon.stub(),
      loadMoreFrom: sinon.stub(),
      initializeForEvent: sinon.stub()
    };
    expenseService.deleteExpense.withArgs("1234", "123").returns({then: function (callback) {
      return callback.call(null);
    }});
    expenseService.loadMoreFrom.withArgs("1234").returns({then: function (callback) {
      return callback.call(null);
    }});
    expenseService.initializeForEvent.withArgs("1234").returns({then: function (callback) {
      return callback.call(null);
    }});
    notificationService = {success: sinon.spy()};
    modalService = {open: sinon.stub().returns({result: {then: function (callback) {callback.call(null, confirmed);}}})};
  });

  beforeEach(function () {
    var ExpensesListController = require("./expenses_list_controller");
    controller = new ExpensesListController($stateParams, expenseService, notificationService, modalService);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should initialize the expenses upon activation", function () {
    expect(expenseService.initializeForEvent).to.have.been.calledWith("1234");
  });

  it("should emit a notification if the expense was successfully deleted", function () {
    controller.deleteExpense({id: "123"});

    expect(modalService.open).to.have.been.calledWith(sinon.match(function (options) {
      var expense = options.resolve.expense();
      return expense.id === "123";
    }));
    expect(notificationService.success).to.have.been.calledWith("EXPENSE_DELETED_SUCCESS");
  });

  it("should not delete the expense if the action is cancelled", function () {
    confirmed = false;

    controller.deleteExpense("eventId", {id: "123"});

    expect(notificationService.success).to.not.have.been.called;
  });
});
