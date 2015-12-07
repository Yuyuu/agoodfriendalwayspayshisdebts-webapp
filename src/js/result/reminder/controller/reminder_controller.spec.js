"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The reminder controller", function () {
  var $state, Reminders, notificationService, controller;

  beforeEach(function () {
    $state = {params: {id: "123"}, href: sinon.stub()};
    $state.href.withArgs("event.results", null, {absolute: true}).returns("http://event/results");
    Reminders = {send: sinon.stub()};
    notificationService = {success: sinon.spy(), error: sinon.spy()};
  });

  beforeEach(function () {
    var ReminderController = require("./reminder_controller");
    controller = new ReminderController($state, Reminders, notificationService);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should send a reminder to the selected recipients", function () {
    Reminders.send.returns({then: function (callback) {callback(); return {catch: function() {}};}});

    controller.sendReminder(["123", "456"], {id: "eventId", name: "hello", participants: [
      {id: "123", name: "bob", email: "bob@email.com"},
      {id: "456", name: "kim", email: "kim@email.com"},
      {id: "789", name: "lea", email: "lea@email.com"}
    ]});

    expect(Reminders.send).to.have.been.calledWith({
      recipients: [{id: "123", name: "bob", email: "bob@email.com"}, {id: "456", name: "kim", email: "kim@email.com"}],
      event: {id: "eventId", name: "hello", link: "http://event/results"}
    });
  });

  it("should reset the recipients and show a success notification on success", function () {
    Reminders.send.returns({then: function (callback) {callback(); return {catch: function() {}};}});
    controller.recipientsIds = ["123", "456"];

    controller.sendReminder([], {});

    expect(controller.recipientsIds).to.be.empty;
    expect(notificationService.success).to.have.been.calledWith("REMINDER_REQUEST_SUCCESS");
  });

  it("should preserve the recipients and show an error notification on error", function () {
    Reminders.send.returns({then: function () {return {catch: function(callback) {callback();}};}});
    controller.recipientsIds = ["123"];

    controller.sendReminder(controller.recipientsIds, {});

    expect(controller.recipientsIds).to.have.length(1);
    expect(notificationService.error).to.have.been.calledWith("REMINDER_REQUEST_ERROR");
  });
});