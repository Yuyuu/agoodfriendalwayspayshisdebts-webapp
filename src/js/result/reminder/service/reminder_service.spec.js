"use strict";

var sinon = require("sinon");

describe("The reminder service", function () {
  var reports, Reminders, service;

  beforeEach(function () {
    Reminders = {send: sinon.stub()};
  });

  beforeEach(function () {
    var ReminderService = require("./reminder_service");
    service = new ReminderService(Reminders);
  });

  it("should be defined", function () {
    service.should.be.defined;
  });

  it("should update the last reports and the failure flag when the send is a success", function () {
    Reminders.send
      .withArgs("123", "data")
      .resolves(["report"]);

    var promise = service.sendReminder("123", "data");

    promise.then(function () {
      service.isFailure.should.be.false;
      service.lastReports[0].should.equal("report");
    });
  });

  it("should update the last reports and the failure flag when the send is a failure", function () {
    Reminders.send
      .withArgs("123", "data")
      .rejects(null);
    reports = ["report"];

    var promise = service.sendReminder("123", "data");

    promise.then(function () {
      service.isFailure.should.be.true;
      service.lastReports.should.have.length(0);
    });
  });
});