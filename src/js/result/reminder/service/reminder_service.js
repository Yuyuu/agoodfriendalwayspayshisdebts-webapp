"use strict";

/* @ngInject */
function ReminderService(Reminders) {
  var service = this;

  service.isFailure = false;

  service.sendReminder = sendReminder;

  function sendReminder(eventId, reminderData) {
    return Reminders.send(eventId, reminderData)
      .then(function (reports) {
        service.isFailure = false;
        service.lastReports = reports;
        return reports;
      })
      .catch(function () {
        service.isFailure = true;
        service.lastReports = [];
      });
  }
}

module.exports = ReminderService;
