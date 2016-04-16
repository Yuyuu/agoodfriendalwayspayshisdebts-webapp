"use strict";

var sinon = require("sinon");

describe("The activity resource", function () {
  var restService, resource;

  beforeEach(function () {
    restService = {get: sinon.stub()};
  });

  beforeEach(function () {
    var ActivityResource = require("./activity_resource");
    resource = new ActivityResource(restService);
  });

  it("should be defined", function () {
    resource.should.be.defined;
  });

  it("should retrieve the activity of an event", function () {
    restService.get
      .withArgs("/api/events/123/activity?filter=all&page=1")
      .resolves([{id: "456"}]);

    var operationsPromise = resource.get("123", 1);

    operationsPromise.then(function (operations) {
      operations[0].id.should.equal("456");
    });
  });

  it("should retrieve the activity with a filter", function () {
    restService.get
      .withArgs("/api/events/123/activity?filter=reminders&page=1")
      .resolves([{id: "456"}]);

    var operationsPromise = resource.getWithFilter("123", "reminders", 1);

    operationsPromise.then(function (operations) {
      operations[0].id.should.equal("456");
    });
  });
});