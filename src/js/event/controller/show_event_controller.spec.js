"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

var FakePromise = require("../../../test/fake_promise");

describe("The show event controller", function () {
  var $state, $modal, notificationService, event, controller;

  beforeEach(function () {
    event = {participants: [{id: "123", name: "Kim"}, {id: "456", name: "Bob"}, {id: "789", name: "Ben"}]};
    $state = {params: {id: "123"}, reload: sinon.spy(), current: {name: "state"}};
    $modal = {open: sinon.stub()};
    notificationService = {success: sinon.spy()};
  });

  beforeEach(function () {
    var ShowEventController = require("./show_event_controller");
    controller = new ShowEventController($state, $modal, notificationService, event);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should reload the state and show a success notification when a participant is added", function () {
    $modal.open
      .withArgs({
        templateUrl: "/templates/modal/add_participant",
        controller: "AddParticipantController",
        controllerAs: "model"
      })
      .returns({result: new FakePromise("then", {name: "Rasheed"})});

    controller.addParticipant();

    expect(controller.event.participants[3].name).to.equal("Rasheed");
    expect($state.reload).to.have.been.calledWith({name: "state"});
    expect(notificationService.success).to.have.been.calledWith("PARTICIPANT_ADDED_SUCCESS");
  });
});