"use strict";

/* @ngInject */
function ReminderController($state, reminderService) {
  var model = this;

  model.reminderService = reminderService;

  model.sendReminder = sendReminder;

  function sendReminder(recipientsIds) {
    model.loading = true;
    var reminderData = {
      recipientsUuids: recipientsIds,
      eventLink: $state.href("event.expenses", null, {absolute: true})
    };
    reminderService.sendReminder($state.params.id, reminderData).finally(function () {
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
