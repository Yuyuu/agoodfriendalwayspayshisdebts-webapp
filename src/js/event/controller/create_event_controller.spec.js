"use strict";

var sinon = require("sinon");

describe("The create event controller", function () {
  var Events, $state, controller;

  beforeEach(function () {
    $state = {go: sinon.stub()};
    Events = {create: sinon.stub()};
  });

  beforeEach(function () {
    var CreateEventController = require("./create_event_controller");
    controller = new CreateEventController($state, Events, []);
  });

  it("should be defined", function () {
    controller.should.be.defined;
  });

  it("should add a participant to the list", function () {
    controller.addParticipant();

    controller.event.participants.should.have.length(2);
  });

  it("should remove a participant from the list", function () {
    controller.removeParticipant(0);

    controller.event.participants.should.have.length(0);
  });

  it("should create the event and redirect to the dedicated page", function () {
    Events.create
      .withArgs("event")
      .resolves({id: "12345"});
    $state.go
      .withArgs("event.expenses", {id: "12345"})
      .resolves("ok");

    var promise = controller.createEvent("event");

    promise.then(function (result) {
      result.should.equal("ok");
    });
  });

  it("should not try to redirect to the event page if the event was not created", function () {
    Events.create
      .withArgs("event")
      .rejects([]);

    var promise = controller.createEvent("event");

    promise.then(function () {
      $state.go.should.not.have.been.called;
    });
  });

  it("should communicate the errors to the view if the event could not be created", function () {
    Events.create
      .withArgs("event")
      .rejects([{message: "a message"}]);

    var promise = controller.createEvent("event");

    promise.then(function () {
      controller.errors.should.deep.equal([{message: "a message"}]);
    });
  });
});