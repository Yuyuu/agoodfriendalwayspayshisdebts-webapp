"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The service responsible for displaying notifications", function () {
  var $alert, service;

  beforeEach(function () {
    $alert = sinon.spy();
  });

  beforeEach(function () {
    var NotificationService = require("./notification_service");
    service = new NotificationService($alert);
  });

  it("should be defined", function () {
    expect(service).to.be.defined;
  });

  it("should display a well formed success notification", function () {
    service.success("HELLO");

    expect($alert).to.have.been.calledWith(sinon.match.has("type", "success"));
    expect($alert).to.have.been.calledWith(sinon.match.has("title", "HELLO.title"));
    expect($alert).to.have.been.calledWith(sinon.match.has("content", "HELLO.content"));
  });
});