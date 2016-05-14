"use strict";

var Bluebird = require("bluebird");
var sinon = require("sinon");

describe("The expense brick controller", function () {
  var confirmed, $stateParams, $modal, expenseService, notificationService, controller;

  beforeEach(function () {
    confirmed = true;
    $stateParams = {id: "1234"};
    expenseService = {deleteExpense: sinon.stub()};
    notificationService = {success: sinon.spy()};
    $modal = {open: sinon.stub()};
  });

  beforeEach(function () {
    var ExpenseBrickController = require("./expense_brick_controller");
    controller = new ExpenseBrickController($stateParams, $modal, expenseService, notificationService);
    controller.expense = {id: "123", state: "ADDED"};
  });

  it("should be defined", function () {
    controller.should.be.defined;
  });

  it("should emit a notification if the expense was successfully deleted", function () {
    $modal.open.returns({result: new Bluebird(function (resolve) {
      resolve(true);
    })});
    expenseService.deleteExpense
      .withArgs("1234", {id: "123", state: "ADDED"})
      .resolves(null);

    var promise = controller.delete();

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
      .withArgs("1234", {id: "123", state: "ADDED"})
      .resolves(null);

    var promise = controller.delete();

    promise.then(function () {
      notificationService.success.should.not.have.been.called;
    });
  });

  it("should know if the expense is deleted", function () {
    controller.deleted.should.be.false;
    controller.expense.state = "DELETED";
    controller.deleted.should.be.true;
  });
});