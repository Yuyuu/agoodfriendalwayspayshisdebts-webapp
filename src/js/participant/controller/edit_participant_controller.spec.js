"use strict";

var sinon = require("sinon");

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
    controller.should.be.defined;
  });

  it("should resolve the modal with the updated participant", function () {
    Participants.update
      .withArgs("123", {id: "456"})
      .resolves(null);

    var promise = controller.update({id: "456"});

    promise.then(function () {
      $modalInstance.close.should.have.been.calledWith({id: "456"});
    });
  });

  it("should communicate the errors of the request to the view", function () {
    Participants.update
      .withArgs("123", {})
      .rejects(["error"]);

    var promise = controller.update({});

    promise.then(function () {
      controller.errors.should.deep.equal(["error"]);
    });
  });

  it("should stop loading when the request is ended", function () {
    Participants.update
      .withArgs("123", {})
      .resolves(null);

    var promise = controller.update({});

    promise.then(function () {
      controller.loading.should.be.false;
    });
  });

  it("should reject the modal with null", function () {
    controller.cancel();

    $modalInstance.close.should.have.been.calledWith(null);
  });
});