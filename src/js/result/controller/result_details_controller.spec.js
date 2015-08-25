"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller responsible for the event result page", function () {
  var EventsService, event, results, controller;

  beforeEach(function () {
    EventsService = {findParticipantName: sinon.stub()};
    event = {
      participants: [{id: "123", name: "Kim"}]
    };
    results = {};
  });

  beforeEach(function () {
    var ResultDetailsController = require("./result_details_controller");
    controller = new ResultDetailsController(EventsService, event, results);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should communicate with the view", function () {
    expect(controller.event).to.equal(event);
    expect(controller.result).to.equal(results);
  });

  it("should find a participant name by delegating to the EventsService", function () {
    EventsService.findParticipantName.withArgs(event, "123").returns("Kim");
    expect(controller.findParticipantName("123")).to.equal("Kim");
  });
});