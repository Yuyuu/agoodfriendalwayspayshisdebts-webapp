"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The reminder service", function () {
  var reports, Reminders, service;

  beforeEach(function () {
    Reminders = {send: sinon.stub()};
    Reminders.send.returns({then: function (callback) {callback.call(null, reports); return {catch: function () {}};}});
  });

  beforeEach(function () {
    var ReminderService = require("./reminder_service");
    service = new ReminderService(Reminders);
  });

  it("should be defined", function () {
    expect(service).to.be.defined;
  });

  it("should update the last reports and the failure flag when the send is a success", function () {
    reports = ["report"];

    service.sendReminder("123", "data");

    expect(service.isFailure).to.be.false;
    expect(service.lastReports[0]).to.equal("report");
  });

  it("should update the last reports and the failure flag when the send is a failure", function () {
    Reminders.send.returns({then: function () {return {catch: function (callback) {callback.call(null);}};}});
    reports = ["report"];

    service.sendReminder("123", "data");

    expect(service.isFailure).to.be.true;
    expect(service.lastReports).to.have.length(0);
  });
});