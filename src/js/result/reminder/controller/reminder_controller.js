"use strict";

/* @ngInject */
function ReminderController(reminderService) {
  var model = this;

  model.reminderService = reminderService;

  model.sendReminder = sendReminder;

  function sendReminder(eventId, recipientsIds) {
    model.loading = true;
    reminderService.sendReminder(eventId, {recipientsUuids: recipientsIds}).finally(function () {
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
