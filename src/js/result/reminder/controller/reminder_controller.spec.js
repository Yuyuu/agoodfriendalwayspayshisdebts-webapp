"use strict";

var sinon = require("sinon");

describe("The reminder controller", function () {
  var $state, Reminders, notificationService, controller;

  beforeEach(function () {
    $state = {params: {id: "123"}, href: sinon.stub()};
    $state.href
      .withArgs("event.results", null, {absolute: true})
      .returns("http://event/results");
    Reminders = {send: sinon.stub()};
    notificationService = {success: sinon.spy(), error: sinon.spy()};
  });

  beforeEach(function () {
    var ReminderController = require("./reminder_controller");
    controller = new ReminderController($state, Reminders, notificationService);
  });

  it("should be defined", function () {
    controller.should.be.defined;
  });

  it("should send a reminder to the selected recipients", function () {
    Reminders.send.resolves(null);

    var promise = controller.sendReminder(["123", "456"], {id: "eventId", name: "hello", participants: [
      {id: "123", name: "bob", email: "bob@email.com"},
      {id: "456", name: "kim", email: "kim@email.com"},
      {id: "789", name: "lea", email: "lea@email.com"}
    ]});

    promise.then(function () {
      Reminders.send.should.have.been.calledWith({
        recipients: [{id: "123", name: "bob", email: "bob@email.com"}, {id: "456", name: "kim", email: "kim@email.com"}],
        event: {id: "eventId", name: "hello", link: "http://event/results"}
      });
    });
  });

  it("should reset the recipients and show a success notification on success", function () {
    Reminders.send.resolves(null);
    controller.recipientsIds = ["123", "456"];

    var promise = controller.sendReminder([], {participants: []});

    promise.then(function () {
      controller.recipientsIds.should.be.empty;
      notificationService.success.should.have.been.calledWith("REMINDER_REQUEST_SUCCESS");
    });
  });

  it("should preserve the recipients and show an error notification on error", function () {
    Reminders.send.rejects(null);
    controller.recipientsIds = ["123"];

    var promise = controller.sendReminder(controller.recipientsIds, {participants: []});

    promise.then(function () {
      controller.recipientsIds.should.have.length(1);
      notificationService.error.should.have.been.calledWith("REMINDER_REQUEST_ERROR");
    });
  });
});