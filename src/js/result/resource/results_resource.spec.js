"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The resource responsible for the server communication for result", function () {
  var $http, resource;

  beforeEach(function () {
    $http = {get: sinon.stub()};
    $http.get.withArgs("/api/events/1234/result").returns({then: function (callback) {
      return callback.call(null, {status: 200, data: {property: "hello"}});
    }});
  });

  beforeEach(function () {
    var ResultsResource = require("./results_resource");
    resource = new ResultsResource($http);
  });

  it("should mask the underlying http request", function () {
    var result = resource.get("1234");

    expect(result.property).to.equal("hello");
  });
});