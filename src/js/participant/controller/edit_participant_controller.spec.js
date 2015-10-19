"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

var FakePromise = require("../../../test/fake_promise");

describe("The edit participant controller", function () {
  var $stateParams, $modalInstance, Participants, participant, controller;

  beforeEach(function () {
    $stateParams = {id: "123"};
    $modalInstance = {close: sinon.spy()};
    Participants = {update: sinon.stub()};
    participant = {id: "456"};
  });

  beforeEach(function () {
    var EditParticipantController = require("./edit_participant_controller");
    controller = new EditParticipantController($stateParams, $modalInstance, Participants, participant);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should resolve the modal with the updated participant", function () {
    Participants.update.returns(new FakePromise("then"));

    controller.update({id: "456"});

    expect($modalInstance.close).to.have.been.calledWith({id: "456"});
  });

  it("should communicate the errors of the request to the view", function () {
    Participants.update.returns(new FakePromise("catch", ["error"]));

    controller.update({});

    expect(controller.errors).to.deep.equal(["error"]);
  });

  it("should stop loading when the request is ended", function () {
    Participants.update.returns(new FakePromise("finally"));

    controller.update({});

    expect(controller.loading).to.be.false;
  });

  it("should reject the modal with null", function () {
    controller.cancel();

    expect($modalInstance.close).to.have.been.calledWith(null);
  });
});