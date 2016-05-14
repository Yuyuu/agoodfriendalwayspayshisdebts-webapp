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
      .withArgs("/api/events/123/activity?page=1")
      .resolves({data: {items: [{id: "456"}]}});

    var operationsPromise = resource.get("123");

    operationsPromise.then(function (operations) {
      operations[0].id.should.equal("456");
    });
  });

  it("should store the next url", function () {
    restService.get
      .withArgs("/api/events/123/activity?page=1")
      .resolves({data: {items: []}, links: {next: {url: "/path"}}});
    restService.get
      .withArgs("/api/path")
      .resolves({data: {items: []}, links: {}});

    var promise = resource.get("123");

    resource.hasNext().should.be.false;
    promise.then(function () {
      resource.hasNext().should.be.true;
      resource.next();
      restService.get.should.have.been.calledWith("/api/path", {withLinkObject: true});
    });
  });
});