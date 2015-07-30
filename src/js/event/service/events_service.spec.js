"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("The service to handle event operations", function () {
  var event, service;

  beforeEach(function () {
    event = {
      participants: [{id: "123", name: "Kim"}, {id: "456", name: "Lea"}, {id: "789", name: "Ben"}],
      purchases: [{purchaser: "123"}]
    };
  });

  beforeEach(function () {
    var EventService = require("./events_service");
    service = new EventService();
  });

  it("should retrieve an event participant name based on its id", function () {
    expect(service.findParticipantName(event, "123")).to.equal("Kim");
  });

  it("should retrieve the names of an event participants", function () {
    expect(service.findEventParticipantsNames(event)).to.deep.equal(["Kim", "Lea", "Ben"]);
  });

  it("should retrieve the names of a purchase participants based on their ids", function () {
    expect(service.findPurchaseParticipantsNames(event, ["123", "456"])).to.deep.equal(["Kim", "Lea"]);
  });
});