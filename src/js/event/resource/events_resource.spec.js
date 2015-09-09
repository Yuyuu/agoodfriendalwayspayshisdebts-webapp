"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The resource responsible for the server communication about events", function () {
  var $http, resource;

  beforeEach(function () {
    $http = {get: sinon.stub(), post: sinon.stub()};
    $http.get.withArgs("/api/events/1234/meta").returns({then: function (callback) {
      return callback.call(null, {status: 200, data: {name: "event"}});
    }});
    $http.post.returns({then: function (callback) {
      return callback.call(null, {status: 201, data: {id: "1234"}});
    }});
  });

  beforeEach(function () {
    var Events = require("./events_resource");
    resource = new Events($http);
  });

  it("should be defined", function () {
    expect(resource).to.be.defined;
  });

  it("should mask the underlying http request when getting an event", function () {
    var result = resource.get("1234");

    expect(result.name).to.equal("event");
  });

  it("should mask the underlying http request when creating an event", function () {
    var result = resource.create({name: "event"});

    expect(result.id).to.equal("1234");
  });
});