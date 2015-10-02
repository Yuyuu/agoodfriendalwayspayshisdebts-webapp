"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The resource responsible for the server communication about events", function () {
  var $http, $q, resource;

  beforeEach(function () {
    $q = {reject: function (o) {return o;}};
    $http = {get: sinon.stub(), post: sinon.stub()};
    $http.get.withArgs("/api/events/1234/meta").returns({then: function (callback) {
      return callback.call(null, {status: 200, data: {name: "event"}});
    }});
    $http.post.withArgs("/api/events").returns({then: function (callback) {
      return callback.call(null, {status: 201, data: {id: "1234"}});
    }});
    $http.post.withArgs("/api/events/1234/participants").returns({catch: function (callback) {
      return callback.call(null, {status: 400, data: {errors: []}});
    }});
  });

  beforeEach(function () {
    var Events = require("./events_resource");
    resource = new Events($http, $q);
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

  it("should post a participant", function () {
    resource.addParticipant("1234", {name: "lea"});

    expect($http.post).to.have.been.calledWith("/api/events/1234/participants", {name: "lea"});
  });

  it("should extract the an array of errors from the response", function () {
    var errors = resource.addParticipant("1234", {name: "lea"});

    expect(errors).to.be.instanceOf(Array);
  });
});