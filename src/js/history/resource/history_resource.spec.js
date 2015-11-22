"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The history resource", function () {
  var $http, resource;

  beforeEach(function () {
    $http = {get: sinon.stub()};
  });

  beforeEach(function () {
    var HistoryResource = require("./history_resource");
    resource = new HistoryResource($http);
  });

  it("should be defined", function () {
    expect(resource).to.be.defined;
  });

  it("should retrieve the history", function () {
    $http.get.withArgs("/api/events/123/history?type=reminders&page=1").returns({
      then: function (callback) {return callback({data: [{id: "456"}]});}
    });

    var history = resource.get("123", "reminders", 1);

    expect(history[0].id).to.equal("456");
  });
});