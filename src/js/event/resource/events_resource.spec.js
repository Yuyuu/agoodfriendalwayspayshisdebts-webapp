"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The events resource", function () {
  var $http, $q, resource;

  beforeEach(function () {
    $q = {reject: function (o) {return o;}};
    $http = {get: sinon.stub(), post: sinon.stub()};
  });

  beforeEach(function () {
    var Events = require("./events_resource");
    resource = new Events($http, $q);
  });

  it("should be defined", function () {
    expect(resource).to.be.defined;
  });

  it("should mask the underlying http request when getting an event", function () {
    $http.get.withArgs("/api/events/123/meta").returns({then: function (callback) {
      return callback.call(null, {status: 200, data: {name: "event"}});
    }});

    var result = resource.get("123");

    expect(result.name).to.equal("event");
  });

  it("should mask the underlying http request when creating an event", function () {
    $http.post.withArgs("/api/events").returns({then: function (callback) {
      return callback.call(null, {status: 201, data: {id: "123"}});
    }});

    var result = resource.create({name: "event"});

    expect(result.id).to.equal("123");
  });

  it("should post a participant", function () {
    $http.post.withArgs("/api/events/123/participants").returns({then: function (callback) {
      return {catch: function () {
        return callback({status: 201, data: {id: "456"}});
      }};
    }});

    var data = resource.addParticipant("123", {name: "lea"});

    expect(data.id).to.equal("456");
  });

  it("should extract the an array of errors from the response", function () {
    $http.post.withArgs("/api/events/123/participants").returns({
      then: function () {
        return {catch: function (callback) {return callback.call(null, {status: 400, data: {errors: []}});}};
      }
    });

    var errors = resource.addParticipant("123", {name: "lea"});

    expect(errors).to.be.instanceOf(Array);
  });

  it("should extract a default error is none is provided", function () {
    $http.post.withArgs("/api/events/123/participants").returns({
      then: function () {
        return {catch: function (callback) {return callback.call(null, {status: 500});}};
      }
    });

    var errors = resource.addParticipant("123", {name: "lea"});

    expect(errors[0].message).to.equal("ADD_PARTICIPANT_DEFAULT_ERROR");
  });
});