"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The add expense controller", function () {
  var $stateParams, expenseService, notificationService, controller;

  beforeEach(function () {
    $stateParams = {id: "123"};
    expenseService = {
      expenses: [],
      addExpense: sinon.stub()
    };
    notificationService = {success: sinon.spy()};
  });

  beforeEach(function () {
    var AddExpenseController = require("./add_expense_controller");
    controller = new AddExpenseController($stateParams, expenseService, notificationService);
    controller.form = {$setPristine: sinon.spy(), $setUntouched: sinon.spy()};
  });

  it("should be defined", function () {
    controller.should.be.defined;
  });

  it("should clear the form if the expense was successfully added", function () {
    expenseService.addExpense
      .withArgs("123", {id: "123"})
      .resolves(null);
    controller.expense = {label: "lab", purchaserUuid: "pur", amount: 1, participantsUuids: ["par"], description: "desc"};

    var promise = controller.addExpense({id: "123"});

    promise.then(function () {
      controller.form.$setPristine.should.have.been.called;
      controller.form.$setUntouched.should.have.been.called;
      expect(controller.expense.label).to.be.undefined;
      expect(controller.expense.purchaserUuid).to.be.undefined;
      expect(controller.expense.amount).to.be.undefined;
      controller.expense.participantsUuids.should.have.length(0);
      expect(controller.expense.description).to.be.undefined;
    });
  });

  it("should emit a notification if the expense was successfully added", function () {
    expenseService.addExpense
      .withArgs("123", {id: "123"})
      .resolves(null);

    var promise = controller.addExpense({id: "123"});

    promise.then(function () {
      notificationService.success.should.have.been.calledWith("EXPENSE_ADDED_SUCCESS");
    });
  });

  it("should communicate the errors to the view if the expense could not be added", function () {
    expenseService.addExpense
      .withArgs("123", {id: "123"})
      .rejects([{message: "a message"}]);

    var promise = controller.addExpense({id: "123"});

    promise.then(function () {
      controller.errors.should.deep.equal([{message: "a message"}]);
    });
  });
});