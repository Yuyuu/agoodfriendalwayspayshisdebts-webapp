"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller responsible for confirming the deletion of an expense", function () {
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
    expect(controller).to.be.defined;
  });

  it("should communicate with the view", function () {
    expect(controller.expense).to.deep.equal(expense);
  });

  it("should reply with the confirmation", function () {
    controller.close(true);

    expect($modalInstance.close).to.have.been.calledWith(true);
  });
});