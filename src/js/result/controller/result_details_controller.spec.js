"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("The controller responsible for the event result page", function () {
  var event, results, controller;

  beforeEach(function () {
    event = {
      participants: [{"id": "123", "name": "Kim"}]
    };
    results = {};
  });

  beforeEach(function () {
    var ResultDetailsController = require("./result_details_controller");
    controller = new ResultDetailsController(event, results);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should communicate with the view", function () {
    expect(controller.event).to.deep.equal(event);
    expect(controller.results).to.deep.equal(results);
  });

  it("should find a participant name", function () {
    expect(controller.findParticipantName("123")).to.equal("Kim");
  });
});