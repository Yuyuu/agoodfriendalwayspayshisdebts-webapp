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

  describe("[get]", function () {
    it("should mask the underlying http request when getting an event", function () {
      $http.get.withArgs("/api/events/123/meta").returns({then: function (callback) {
        return callback.call(null, {status: 200, data: {name: "event"}});
      }});

      var result = resource.get("123");

      expect(result.name).to.equal("event");
    });
  });

  describe("[create]", function () {
    it("should mask the underlying http request when creating an event", function () {
      $http.post.withArgs("/api/events").returns({
        catch: function () {
          return {then: function (callback) {return callback({status: 201, data: {id: "123"}});}};
        }
      });

      var result = resource.create({name: "event"});

      expect(result.id).to.equal("123");
    });

    it("should extract an array of messages from the response on error", function () {
      $http.post.withArgs("/api/events").returns({
        catch: function (callback) {
          return {then: function () {return callback({status: 400, data: {errors: []}});}};
        }
      });

      var errors = resource.create({});

      expect(errors).to.be.instanceOf(Array);
    });

    it("should extract a default message if none is provided on error", function () {
      $http.post.withArgs("/api/events").returns({
        catch: function (callback) {
          return {then: function () {return callback({status: 500});}};
        }
      });

      var errors = resource.create({});

      expect(errors[0].message).to.equal("DEFAULT");
    });
  });
});