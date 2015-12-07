"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The reminders resource", function () {
  var $http, resource;

  beforeEach(function () {
    $http = {post: sinon.stub()};
  });

  beforeEach(function () {
    var ReminderResource = require("./reminders_resource");
    resource = new ReminderResource($http);
  });

  it("should be defined", function () {
    expect(resource).to.be.defined;
  });

  it("should post the reminder data", function () {
    $http.post.withArgs("/reminders").returns({then: function (callback) {
      return callback.call(null, {status: 201, data: "hello"});
    }});

    var result = resource.send({});

    expect(result).to.equal("hello");
  });
});