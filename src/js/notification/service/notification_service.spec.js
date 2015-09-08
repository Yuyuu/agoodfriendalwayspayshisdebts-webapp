"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The service responsible for displaying notifications", function () {
  var Notification, service;

  beforeEach(function () {
    Notification = {success: sinon.spy()};
  });

  beforeEach(function () {
    var NotificationService = require("./notification_service");
    service = new NotificationService(Notification);
  });

  it("should be defined", function () {
    expect(service).to.be.defined;
  });

  it("should display a well formed success notification", function () {
    service.success("HELLO");

    expect(Notification.success).to.have.been.calledWith(sinon.match.has("title", "HELLO"));
    expect(Notification.success).to.have.been.calledWith(sinon.match.has("message", "HELLO"));
  });
});