"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller to create events", function () {
  var Events, $state, controller;

  beforeEach(function () {
    Events = {create: sinon.stub()};
    $state = {go: sinon.spy()};
  });

  beforeEach(function () {
    var CreateEventController = require("./create_event_controller");
    controller = new CreateEventController(Events, $state);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should add a participant to the list", function () {
    controller.addParticipant();

    expect(controller.event.participants).to.have.length(2);
  });

  it("should remove a participant from the list", function () {
    controller.removeParticipant(0);

    expect(controller.event.participants).to.have.length(0);
  });

  it("should create the event", function () {
    var event = {name: "Cool event", participants: [{name: "Kim", email: "", share: 1}]};
    Events.create.returns({then: function (callback) {callback.call(null, {}); return {catch: sinon.spy()};}});

    controller.createEvent(event);

    expect(Events.create).to.have.been.called;
  });

  it("should redirect to the event page when it has been successfully created", function () {
    Events.create.returns({then: function (callback) {callback.call(null, {id: "12345"}); return {catch: sinon.spy()};}});
    var event = {name: "Cool event", participants: [{name: "Kim", email: "", share: 1}]};

    controller.createEvent(event);

    expect($state.go).to.have.been.calledWith("event.details", {id: "12345"});
  });

  it("should not try to redirect to the event page if the event was not created", function () {
    Events.create.returns({then: function () {return {catch: function (callback) {callback.call(null, {});}};}});
    var event = {name: "Cool event", participants: [{name: "Kim", email: "", share: 1}]};

    controller.createEvent(event);

    expect($state.go).to.not.have.been.called;
  });

  it("should get a reason if the event could not be created", function () {
    Events.create.returns({then: function () {return {catch: function (callback) {
      callback.call(null, {status: 400, data: {errors: [{message: "a message"}]}});
    }};}});
    var event = {name: "Cool event", participants: [{name: "Kim", email: "", share: 1}]};

    controller.createEvent(event);

    expect(controller.errors).to.deep.equal([{message: "a message"}]);
  });

  it("should get a default reason if an unhandled error occurred while creating an event", function () {
    Events.create.returns({then: function () {return {catch: function (callback) {callback.call(null, {});}};}});
    var event = {name: "Cool event", participants: [{name: "Kim", email: "", share: 1}]};

    controller.createEvent(event);

    expect(controller.errors).to.deep.equal([{message: "CREATE_EVENT_DEFAULT_ERROR"}]);
  });
});