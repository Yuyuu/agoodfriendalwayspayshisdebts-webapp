"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The resource responsible for the server communication about event reminders", function () {
  var $http, resource;

  beforeEach(function () {
    $http = {post: sinon.stub()};
    $http.post.returns({then: function (callback) {
      return callback.call(null, {status: 201, data: ["456", "789"]});
    }});
  });

  beforeEach(function () {
    var ReminderResource = require("./reminders_resource");
    resource = new ReminderResource($http);
  });

  it("should be defined", function () {
    expect(resource).to.be.defined;
  });

  it("should post the reminder data", function () {
    var result = resource.send("123", ["456", "789"]);

    expect(result).to.have.members(["456", "789"]);
  });
});