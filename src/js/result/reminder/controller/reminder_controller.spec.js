"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller responsible for sending reminders", function () {
  var $state, reminderService, controller;

  beforeEach(function () {
    $state = {href: sinon.stub().withArgs("event.expenses", null, {absolute: true}).returns("http://event/expenses")};
    reminderService = {lastReports: [{success: true}], isFailure: false, sendReminder: sinon.stub()};
    reminderService.sendReminder.returns({finally: function (callback) {callback.call(null);}});
  });

  beforeEach(function () {
    var ReminderController = require("./reminder_controller");
    controller = new ReminderController($state, reminderService);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should send a reminder to the selected recipients", function () {
    controller.sendReminder("123", ["456", "789"]);

    expect(reminderService.sendReminder).to.have.been.calledWith(
      "123",
      {recipientsUuids: ["456", "789"], eventLink: "http://event/expenses"}
    );
  });

  it("should reset the recipients after a tentative", function () {
    controller.sendReminder("123", ["456", "789"]);

    expect(controller.recipientsIds).to.be.empty;
  });

  it("should bind the model properties to those of the service", function () {
    expect(controller.reports[0].success).to.be.true;
    expect(controller.isFailure).to.be.false;
  });
});