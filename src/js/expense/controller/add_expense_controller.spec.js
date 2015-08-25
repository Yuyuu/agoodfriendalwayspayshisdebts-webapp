"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller to add expenses", function () {
  var event, expense, Expenses, Notifications, controller;

  beforeEach(function () {
    event = {id: "123", expenses: []};
    expense = {label: "Food", purchaser: "Kim", amount: 5, participants: ["Kim"], description: "Hmmm"};
    Expenses = {add: sinon.spy()};
    Notifications = {success: sinon.spy()};
  });

  beforeEach(function () {
    var AddExpenseController = require("./add_expense_controller");
    controller = new AddExpenseController(Expenses, Notifications);
    controller.form = {$setPristine: sinon.spy(), $setUntouched: sinon.spy()};
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should pass the expense with the event id to the resource", function () {
    controller.addExpense(event, expense);

    expect(Expenses.add).to.have.been.calledWith(sinon.match.has("eventId", "123"));
  });

  it("should clear the form if the expense was successfully added", function () {
    controller.expense = expense;
    Expenses.add = function (data, successCb) {successCb(expense);};

    controller.addExpense(event, expense);

    expect(controller.form.$setPristine).to.have.been.called;
    expect(controller.form.$setUntouched).to.have.been.called;
    expect(controller.expense.label).to.be.undefined;
    expect(controller.expense.purchaserUuid).to.be.undefined;
    expect(controller.expense.amount).to.be.undefined;
    expect(controller.expense.participantsUuids).to.have.length(0);
    expect(controller.expense.description).to.be.undefined;
  });

  it("should push the new expense to the event if it was successfully added", function () {
    Expenses.add = function (data, successCb) {successCb(expense);};

    controller.addExpense(event, expense);

    expect(event.expenses[0].label).to.equal("Food");
  });

  it("should emit a notification if the expense was successfully added", function () {
    Expenses.add = function (data, successCb) {successCb(expense);};

    controller.addExpense(event, expense);

    expect(Notifications.success).to.have.been.calledWith("EXPENSE_ADDED_SUCCESS");
  });

  it("should not add any to the event if it was not created", function () {
    Expenses.add = function (data, successCb, errorCb) {errorCb({data: {errors: []}});};

    controller.addExpense(event, expense);

    expect(event.expenses).to.have.length(0);
  });

  it("should get a reason if the expense could not be added", function () {
    Expenses.add = function (data, successCb, errorCb) {
      errorCb({status: 400, data: {errors: [{message: "a message"}]}});
    };

    controller.addExpense(event, expense);

    expect(controller.errors).to.deep.equal([{message: "a message"}]);
  });

  it("should get a default reason if an unhandled error occurred while adding an expense", function () {
    Expenses.add = function (data, successCb, errorCb) {errorCb({});};

    controller.addExpense(event, expense);

    expect(controller.errors).to.deep.equal([{message: "ADD_EXPENSE_DEFAULT_ERROR"}]);
  });
});