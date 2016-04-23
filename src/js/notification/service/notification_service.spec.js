"use strict";

var sinon = require("sinon");

describe("The notification service", function () {
  var Notification, service;

  beforeEach(function () {
    Notification = {success: sinon.spy(), error: sinon.spy()};
  });

  beforeEach(function () {
    var NotificationService = require("./notification_service");
    service = new NotificationService(Notification);
  });

  it("should be defined", function () {
    service.should.be.defined;
  });

  it("should display a well formed success notification", function () {
    service.success("HELLO");

    Notification.success.should.have.been.calledWith(sinon.match.has("title", "HELLO"));
    Notification.success.should.have.been.calledWith(sinon.match.has("message", "HELLO"));
  });

  it("should display a well formed error notification", function () {
    service.error("ARF");

    Notification.error.should.have.been.calledWith(sinon.match.has("title", "ARF"));
    Notification.error.should.have.been.calledWith(sinon.match.has("message", "ARF"));
  });
});