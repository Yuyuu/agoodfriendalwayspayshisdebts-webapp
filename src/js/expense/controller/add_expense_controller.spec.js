"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller to add expenses", function () {
  var $stateParams, expenseService, notificationService, controller;

  beforeEach(function () {
    $stateParams = {id: "123"};
    expenseService = {
      expenses: [],
      addExpense: sinon.stub().withArgs({eventId: "eventId", id: "123"}).returns({then: function (callback) {
        callback.call(null);
        return {catch: sinon.spy()};
      }})};
    notificationService = {success: sinon.spy()};
  });

  beforeEach(function () {
    var AddExpenseController = require("./add_expense_controller");
    controller = new AddExpenseController($stateParams, expenseService, notificationService);
    controller.form = {$setPristine: sinon.spy(), $setUntouched: sinon.spy()};
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should clear the form if the expense was successfully added", function () {
    controller.expense = {label: "lab", purchaserUuid: "pur", amount: 1, participantsUuids: ["par"], description: "desc"};

    controller.addExpense({id: "123"});

    expect(controller.form.$setPristine).to.have.been.called;
    expect(controller.form.$setUntouched).to.have.been.called;
    expect(controller.expense.label).to.be.undefined;
    expect(controller.expense.purchaserUuid).to.be.undefined;
    expect(controller.expense.amount).to.be.undefined;
    expect(controller.expense.participantsUuids).to.have.length(0);
    expect(controller.expense.description).to.be.undefined;
  });

  it("should emit a notification if the expense was successfully added", function () {
    controller.addExpense({id: "123"});

    expect(notificationService.success).to.have.been.calledWith("EXPENSE_ADDED_SUCCESS");
  });

  it("should get a reason if the expense could not be added", function () {
    expenseService.addExpense.returns({then: function () {return {catch: function (callback) {
      return callback.call(null, {status: 400, data: {errors: [{message: "a message"}]}});}
    };}});

    controller.addExpense({id: "123"});

    expect(controller.errors).to.deep.equal([{message: "a message"}]);
  });

  it("should get a default reason if an unhandled error occurred while adding an expense", function () {
    expenseService.addExpense.returns({then: function () {return {catch: function (callback) {
      return callback.call(null, {});
    }};}});

    controller.addExpense({id: "123"});

    expect(controller.errors).to.deep.equal([{message: "ADD_EXPENSE_DEFAULT_ERROR"}]);
  });
});