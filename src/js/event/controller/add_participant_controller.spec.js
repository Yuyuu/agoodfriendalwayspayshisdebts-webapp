"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The add participant controller", function () {
  var $stateParams, $modalInstance, Expenses, controller;

  beforeEach(function () {
    $stateParams = {};
    $modalInstance = {close: sinon.spy()};
    Expenses = {
      metadata: sinon.stub().withArgs("eventId").returns({
        then: function (callback) {return callback.call(null, [{id: "123", "label": "e1"}]);}
      })
    };
  });

  beforeEach(function () {
    var AddParticipantController = require("./add_participant_controller");
    controller = new AddParticipantController($stateParams, $modalInstance, Expenses);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should load the expenses metadata on activation", function () {
    expect(controller.expensesMetadata).to.have.length(1);
    expect(controller.expensesMetadata[0]).to.deep.equal({id: "123", label: "e1"});
  });

  it("should resolve the modal with the participant to add", function () {
    controller.participant = {name: "kim", share: 1};

    controller.add();

    expect($modalInstance.close).to.have.been.calledWith({name: "kim", share: 1});
  });

  it("should reject the modal with null", function () {
    controller.cancel();

    expect($modalInstance.close).to.have.been.calledWith(null);
  });
});