"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("The controller responsible for showing an event details", function () {
  var event, controller;

  beforeEach(function () {
    event = {
      participants: [{id: "123", name: "Kim", email: "", share: 1}, {id: "456", name: "Bob", email: "", share: 1}],
      purchases: [{purchaser_id: "123", participants_ids: ["123", "456"]}]
    };
  });

  beforeEach(function () {
    var ShowEventController = require("./show_event_controller");
    controller = new ShowEventController(event);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should return the list of participants as a string", function () {
    expect(controller.stringifyParticipantsNames()).to.equal("Kim, Bob");
  });

  it("should find the name of the purchaser", function () {
    expect(controller.findPurchaserName(event.purchases[0].purchaser_id)).to.equal("Kim");
  });

  it("should find the names of the participants of a purchase", function () {
    expect(controller.findPurchaseParticipantsNames(["123", "456"])).to.equal("Kim, Bob");
  });
});