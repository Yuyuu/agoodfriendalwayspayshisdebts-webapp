"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The participants resource", function () {
  var callbackParam, $http, $q, resource;

  beforeEach(function () {
    callbackParam = {};
    $http = {post: sinon.stub(), put: sinon.stub()};
    $http.put.returns({catch: function (callback) {return callback(callbackParam);}});
    $q = {reject: function (o) {return o;}};
  });

  beforeEach(function () {
    var ParticipantsResource = require("./participants_resource");
    resource = new ParticipantsResource($http, $q);
  });

  it("should be defined", function () {
    expect(resource).to.be.defined;
  });

  describe("[add]", function () {
    it("should post a participant", function () {
      $http.post.withArgs("/api/events/123/participants").returns({
        catch: function () {
          return {then: function (callback) {return callback({status: 201, data: {id: "456"}});}};
        }
      });

      var data = resource.add("123", {name: "lea"});

      expect(data.id).to.equal("456");
    });

    it("should extract an array of messages from the response on error", function () {
      $http.post.withArgs("/api/events/123/participants").returns({
        catch: function (callback) {
          return {then: function () {return callback({status: 400, data: {errors: []}});}};
        }
      });

      var errors = resource.add("123", {name: "lea"});

      expect(errors).to.be.instanceOf(Array);
    });

    it("should extract a default message if none is provided on error", function () {
      $http.post.withArgs("/api/events/123/participants").returns({
        catch: function (callback) {
          return {then: function () {return callback({status: 500});}};
        }
      });

      var errors = resource.add("123", {name: "lea"});

      expect(errors[0].message).to.equal("DEFAULT");
    });
  });

  describe("[update]", function () {
    it("should put a participant", function () {
      resource.update("123", {id: "456"});

      expect($http.put).to.have.been.calledWith("/api/events/123/participants/456");
    });

    it("should extract the an array of errors from the response on error", function () {
      callbackParam.status = 400;
      callbackParam.data = {errors: [{message: "error"}]};
      var errors = resource.update("123", {id: "456"});

      expect(errors[0].message).to.equal("error");
    });

    it("should give a default error if none is provided on error", function () {
      callbackParam.status = 500;
      var errors = resource.update("123", {id: "456"});

      expect(errors[0].message).to.equal("DEFAULT");
    });
  });
});