"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

var FakePromise = require("../../../test/fake_promise");

describe("The add participant controller", function () {
  var $stateParams, $modalInstance, Events, Expenses, controller;

  beforeEach(function () {
    $stateParams = {id: "1234"};
    $modalInstance = {close: sinon.spy()};
    Events = {addParticipant: sinon.stub()};
    Expenses = {metadata: sinon.stub()};
    Expenses.metadata.withArgs("1234").returns(new FakePromise("then", [{id: "123", label: "e1"}]));
  });

  beforeEach(function () {
    var AddParticipantController = require("./add_participant_controller");
    controller = new AddParticipantController($stateParams, $modalInstance, Events, Expenses);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should load the expenses metadata on activation", function () {
    expect(controller.expensesMetadata).to.have.length(1);
    expect(controller.expensesMetadata[0]).to.deep.equal({id: "123", label: "e1"});
  });

  it("should resolve the modal with the added participant", function () {
    Events.addParticipant.returns(new FakePromise("then", {id: "456"}));

    controller.add({name: "kim", share: 1});

    expect($modalInstance.close).to.have.been.calledWith({id: "456", name: "kim", share: 1});
  });

  it("should communicate the errors of the request to the view", function () {
    Events.addParticipant.returns(new FakePromise("catch", ["error"]));

    controller.add({});

    expect(controller.errors).to.deep.equal(["error"]);
  });

  it("should stop loading when the request is ended", function () {
    Events.addParticipant.returns(new FakePromise("finally"));

    controller.add({});

    expect(controller.loading).to.be.false;
  });

  it("should reject the modal with null", function () {
    controller.cancel();

    expect($modalInstance.close).to.have.been.calledWith(null);
  });

  it("should communicate to the view if there is any expense to include the participant in", function () {
    expect(controller.hasExpenses()).to.be.true;

    controller.expensesMetadata = [];
    expect(controller.hasExpenses()).to.be.false;
  });
});