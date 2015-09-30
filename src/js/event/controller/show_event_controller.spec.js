"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller responsible for showing an event details", function () {
  var $stateParams, $modal, Events, event, controller;

  beforeEach(function () {
    $stateParams = {id: "12345"};
    $modal = {open: sinon.spy()};
    event = {participants: [{id: "123", name: "Kim"}, {id: "456", name: "Bob"}, {id: "789", name: "Ben"}]};
    Events = {
      get: sinon.stub().withArgs("12345").returns({then: function (callback) {return callback.call(null, event);}})
    };
  });

  beforeEach(function () {
    var ShowEventController = require("./show_event_controller");
    controller = new ShowEventController($stateParams, $modal, Events);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should load the event details on activation", function () {
    expect(controller.event).to.deep.equal(event);
  });

  it("should open a modal to add a new participant", function () {
    controller.addParticipant();

    expect($modal.open).to.have.been.calledWith({
      templateUrl: "/templates/modal/add_participant",
      controller: "AddParticipantController",
      controllerAs: "model"});
  });
});