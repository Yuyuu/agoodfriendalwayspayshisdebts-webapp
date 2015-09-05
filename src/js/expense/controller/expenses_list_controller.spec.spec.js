"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller responsible for listing the expenses of an event", function () {
  var $stateParams, expenseService, notificationService, controller;

  beforeEach(function () {
    $stateParams = {id: "1234"};
    expenseService = {
      expenses: [{label: "obsolete"}],
      deleteExpense: sinon.stub(),
      loadMoreFrom: sinon.spy(),
      initializeForEvent: sinon.spy()
    };
    expenseService.deleteExpense.withArgs({eventId: "eventId", id: "123"}).returns({then: function (callback) {
      return callback.call(null);
    }});
    notificationService = {success: sinon.spy()};
  });

  beforeEach(function () {
    var ExpensesListController = require("./expenses_list_controller");
    controller = new ExpensesListController($stateParams, expenseService, notificationService);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should initialize the expenses upon activation", function () {
    expect(expenseService.initializeForEvent).to.have.been.calledWith("1234");
  });

  it("should emit a notification if the expense was successfully deleted", function () {
    controller.deleteExpense("eventId", {id: "123"});

    expect(notificationService.success).to.have.been.calledWith("EXPENSE_DELETED_SUCCESS");
  });
});
