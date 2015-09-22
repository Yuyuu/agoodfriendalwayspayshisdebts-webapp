"use strict";

/* @ngInject */
function ReminderController($state, reminderService) {
  var model = this;

  model.reminderService = reminderService;

  model.sendReminder = sendReminder;

  function sendReminder(eventId, recipientsIds) {
    model.loading = true;
    var reminderData = {
      recipientsUuids: recipientsIds,
      eventLink: $state.href("event.details", null, {absolute: true})
    };
    reminderService.sendReminder(eventId, reminderData).finally(function () {
      model.loading = false;
      model.recipientsIds = [];
    });
  }
}

Object.defineProperties(ReminderController.prototype, {
  reports: {
    enumerable: true,
    cofigurable: false,
    get: function () {
      return this.reminderService.lastReports;
    }
  },
  isFailure: {
    enumerable: true,
    cofigurable: false,
    get: function () {
      return this.reminderService.isFailure;
    }
  }
});

module.exports = ReminderController;
