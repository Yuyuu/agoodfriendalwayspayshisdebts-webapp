"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller responsible for sending reminders", function () {
  var Reminders, controller;

  beforeEach(function () {
    Reminders = {send: sinon.spy()};
  });

  beforeEach(function () {
    var ReminderController = require("./reminder_controller");
    controller = new ReminderController(Reminders);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should send a reminder to the selected recipients", function () {
    controller.sendReminder("123", ["456", "789"]);

    expect(Reminders.send).to.have.been.calledWith("123", ["456", "789"]);
  });
});