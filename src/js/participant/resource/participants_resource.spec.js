"use strict";

var sinon = require("sinon");

describe("The participants resource", function () {
  var restService, resource;

  beforeEach(function () {
    restService = {post: sinon.stub(), put: sinon.stub()};
  });

  beforeEach(function () {
    var ParticipantsResource = require("./participants_resource");
    resource = new ParticipantsResource(restService);
  });

  it("should be defined", function () {
    resource.should.be.defined;
  });

  it("should post a participant", function () {
    restService.post
      .withArgs("/api/events/123/participants")
      .resolves({id: "456"});

    var dataPromise = resource.add("123", {name: "lea"});

    dataPromise.then(function (participant) {
      participant.id.should.equal("456");
    });
  });

  it("should put a participant", function () {
    restService.put
      .withArgs("/api/events/123/participants/456")
      .resolves({id: "456"});

    var dataPromise = resource.update("123", {id: "456"});

    dataPromise.then(function (participant) {
      participant.id.should.equal("456");
    });
  });
});