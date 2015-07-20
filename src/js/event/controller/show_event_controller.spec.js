"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("The controller responsible for showing an event details", function () {
  var event, controller;

  beforeEach(function () {
    event = {};
  });

  beforeEach(function () {
    var ShowEventController = require("./show_event_controller");
    controller = new ShowEventController(event);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should return the list of participants as a string", function () {
    event.participants = [{name: "Kim", email: "", share: 1}, {name: "Bob", email: "", share: 1}];

    expect(controller.stringifyParticipantsNames()).to.equal("Kim, Bob");
  });
});