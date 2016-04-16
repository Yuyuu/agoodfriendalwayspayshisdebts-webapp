"use strict";

var sinon = require("sinon");

describe("The reminders resource", function () {
  var restService, resource;

  beforeEach(function () {
    restService = {post: sinon.stub()};
  });

  beforeEach(function () {
    var ReminderResource = require("./reminders_resource");
    resource = new ReminderResource(restService);
  });

  it("should be defined", function () {
    resource.should.be.defined;
  });

  it("should post the reminder data", function () {
    restService.post
      .withArgs("/reminders")
      .resolves("hello");

    var resultPromise = resource.send({});

    resultPromise.then(function (result) {
      result.should.equal("hello");
    });
  });
});