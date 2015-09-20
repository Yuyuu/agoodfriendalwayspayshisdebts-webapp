"use strict";

/* @ngInject */
function ReminderController(Reminders) {
  var model = this;

  model.sendReminder = sendReminder;

  function sendReminder(eventId, recipientsIds) {
    Reminders.send(eventId, recipientsIds);
  }
}

module.exports = ReminderController;
