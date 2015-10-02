"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

var FakePromise = require("../../../test/fake_promise");

describe("The controller responsible for showing an event details", function () {
  var event, $state, $modal, Events, notificationService, controller;

  beforeEach(function () {
    event = {participants: [{id: "123", name: "Kim"}, {id: "456", name: "Bob"}, {id: "789", name: "Ben"}]};
    $state = {params: {id: "123"}, reload: sinon.spy()};
    $modal = {open: sinon.stub()};
    Events = {get: sinon.stub()};
    Events.get.withArgs("123").returns(new FakePromise("then", event));
    notificationService = {success: sinon.spy()};
  });

  beforeEach(function () {
    var ShowEventController = require("./show_event_controller");
    controller = new ShowEventController($state, $modal, Events, notificationService);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should load the event details on activation", function () {
    expect(controller.event).to.deep.equal(event);
  });

  it("should reload the state and show a success when a participant is added", function () {
    $modal.open
      .withArgs({
        templateUrl: "/templates/modal/add_participant",
        controller: "AddParticipantController",
        controllerAs: "model"
      })
      .returns({result: new FakePromise("then", true)});

    controller.addParticipant();

    expect($state.reload).to.have.been.called;
    expect(notificationService.success).to.have.been.calledWith("PARTICIPANT_ADDED_SUCCESS");
  });
});