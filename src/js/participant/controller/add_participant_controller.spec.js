"use strict";

var sinon = require("sinon");

describe("The add participant controller", function () {
  var $stateParams, $modalInstance, Participants, Expenses, controller;

  beforeEach(function () {
    $stateParams = {id: "1234"};
    $modalInstance = {close: sinon.spy()};
    Participants = {add: sinon.stub()};
    Expenses = {metadata: sinon.stub()};
    Expenses.metadata
      .withArgs("1234")
      .resolves([{id: "123", label: "e1"}]);
  });

  beforeEach(function () {
    var AddParticipantController = require("./add_participant_controller");
    controller = new AddParticipantController($stateParams, $modalInstance, Participants, Expenses);
  });

  it("should be defined", function () {
    controller.should.be.defined;
  });

  it("should load the expenses metadata on activation", function () {
    controller.activation.then(function () {
      controller.expensesMetadata.should.have.length(1);
      controller.expensesMetadata[0].should.deep.equal({id: "123", label: "e1"});
    });
  });

  it("should resolve the modal with the added participant", function () {
    Participants.add
      .withArgs("1234", {name: "kim", share: 1})
      .resolves({id: "456"});

    var promise = controller.add({name: "kim", share: 1});

    promise.then(function () {
      $modalInstance.close.should.have.been.calledWith({id: "456", name: "kim", share: 1});
    });
  });

  it("should communicate the errors of the request to the view", function () {
    Participants.add
      .withArgs("1234", {})
      .rejects(["error"]);

    var promise = controller.add({});

    promise.then(function () {
      controller.errors.should.deep.equal(["error"]);
    });
  });

  it("should stop loading when the request is ended", function () {
    Participants.add
      .withArgs("1234", {})
      .resolves({id: "456"});

    var promise = controller.add({});

    promise.then(function () {
      controller.loading.should.be.false;
    });
  });

  it("should reject the modal with null", function () {
    controller.cancel();

    $modalInstance.close.should.have.been.calledWith(null);
  });

  it("should communicate to the view if there is any expense to include the participant in", function () {
    controller.activation.then(function () {
      controller.hasExpenses().should.be.true;

      controller.expensesMetadata = [];
      controller.hasExpenses().should.be.false;
    });
  });
});