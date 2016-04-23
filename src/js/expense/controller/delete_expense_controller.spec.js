"use strict";

var sinon = require("sinon");

describe("The delete expense controller", function () {
  var $modalInstance, expense, controller;

  beforeEach(function () {
    $modalInstance = {close: sinon.spy()};
    expense = {id: "1234"};
  });

  beforeEach(function () {
    var DeleteExpenseController = require("./delete_expense_controller");
    controller = new DeleteExpenseController($modalInstance, expense);
  });

  it("should be defined", function () {
    controller.should.be.defined;
  });

  it("should communicate with the view", function () {
    controller.expense.should.deep.equal(expense);
  });

  it("should reply with the confirmation", function () {
    controller.close(true);

    $modalInstance.close.should.have.been.calledWith(true);
  });
});