"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller responsible for showing an event details", function () {
  var $routeParams, EventsService, Events, event, controller;

  beforeEach(function () {
    $routeParams = {id: "12345"};
    EventsService = {
      findParticipantName: sinon.stub(),
      findExpenseParticipantsNames: sinon.stub(),
      findEventParticipantsNames: sinon.stub()
    };
    event = {
      participants: [{id: "123", name: "Kim"}, {id: "456", name: "Bob"}, {id: "789", name: "Ben"}],
      expenses: [{purchaserId: "123", participantsIds: ["123", "456"]}]
    };
    Events = {
      get: function (data, callback) {callback.call(null, event);}
    };
  });

  beforeEach(function () {
    var ShowEventController = require("./show_event_controller");
    controller = new ShowEventController($routeParams, EventsService, Events);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should return the list of participants as a string", function () {
    EventsService.findEventParticipantsNames.withArgs(event).returns(["Kim", "Bob", "Ben"]);
    expect(controller.stringifyEventParticipantsNames()).to.equal("Kim, Bob, Ben");
  });

  it("should find the name of an expense purchaser by delegating to the EventsService", function () {
    EventsService.findParticipantName.withArgs(event, "123").returns("Kim");
    expect(controller.findPurchaserName("123")).to.equal("Kim");
  });

  it("should find the names of the participants of an expense by delegating to the EventsService", function () {
    EventsService.findExpenseParticipantsNames.withArgs(event, ["123", "456"]).returns(["Kim", "Bob"]);
    expect(controller.stringifyExpenseParticipantsNames(["123", "456"])).to.equal("Kim, Bob");
  });
});