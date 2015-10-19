"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The participants resource", function () {
  var callbackParam, $http, $q, resource;

  beforeEach(function () {
    callbackParam = {};
    $http = {put: sinon.stub()};
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

  it("should put a participant", function () {
    resource.update("123", {id: "456"});

    expect($http.put).to.have.been.calledWith("/api/events/123/participants/456");
  });

  it("should extract the an array of errors from the response", function () {
    callbackParam.status = 400;
    callbackParam.data = {errors: [{message: "error"}]};
    var errors = resource.update("123", {id: "456"});

    expect(errors[0].message).to.equal("error");
  });

  it("should give a default error if none is provided", function () {
    callbackParam.status = 500;
    var errors = resource.update("123", {id: "456"});

    expect(errors[0].message).to.equal("EDIT_PARTICIPANT_DEFAULT_ERROR");
  });
});