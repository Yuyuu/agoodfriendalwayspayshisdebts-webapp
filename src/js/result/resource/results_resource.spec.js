"use strict";

var sinon = require("sinon");

describe("The results resource", function () {
  var restService, resource;

  beforeEach(function () {
    restService = {get: sinon.stub()};
  });

  beforeEach(function () {
    var ResultsResource = require("./results_resource");
    resource = new ResultsResource(restService);
  });

  it("should be defined", function () {
    resource.should.be.defined;
  });

  it("should mask the underlying http request", function () {
    restService.get
      .withArgs("/api/events/1234/results")
      .resolves([{property: "hello"}]);

    var resultPromise = resource.get("1234");

    resultPromise.then(function (results) {
      results.should.have.length(1);
      results[0].property.should.equal("hello");
    });
  });
});