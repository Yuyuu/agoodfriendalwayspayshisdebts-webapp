"use strict";

var sinon = require("sinon");

describe("The events resource", function () {
  var restService, resource;

  beforeEach(function () {
    restService = {get: sinon.stub(), post: sinon.stub()};
  });

  beforeEach(function () {
    var Events = require("./events_resource");
    resource = new Events(restService);
  });

  it("should be defined", function () {
    resource.should.be.defined;
  });

  it("should get an event", function () {
    restService.get
      .withArgs("/api/events/123")
      .resolves({name: "event"});

    var eventPromise = resource.get("123");

    eventPromise.then(function (event) {
      event.name.should.equal("event");
    });
  });

  it("should create an event", function () {
    restService.post
      .withArgs("/api/events")
      .resolves({id: "123"});

    var resultPromise = resource.create({name: "event"});

    resultPromise.then(function (result) {
      result.id.should.equal("123");
    });
  });
});