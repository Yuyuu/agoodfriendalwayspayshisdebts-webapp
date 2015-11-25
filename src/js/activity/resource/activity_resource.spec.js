"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The activity resource", function () {
  var $http, resource;

  beforeEach(function () {
    $http = {get: sinon.stub()};
  });

  beforeEach(function () {
    var ActivityResource = require("./activity_resource");
    resource = new ActivityResource($http);
  });

  it("should be defined", function () {
    expect(resource).to.be.defined;
  });

  it("should retrieve the activity of an event", function () {
    $http.get.withArgs("/api/events/123/activity?filter=all&page=1").returns({
      then: function (callback) {return callback({data: [{id: "456"}]});}
    });
    var operations = resource.get("123", 1);
    expect(operations[0].id).to.equal("456");
  });

  it("should retrieve the activity with a filter", function () {
    $http.get.withArgs("/api/events/123/activity?filter=reminders&page=1").returns({
      then: function (callback) {return callback({data: [{id: "456"}]});}
    });

    var operations = resource.getWithFilter("123", "reminders", 1);

    expect(operations[0].id).to.equal("456");
  });
});