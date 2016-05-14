"use strict";

/* @ngInject */
function ReminderController($state, Reminders, notificationService) {
  var model = this;

  model.sendReminder = sendReminder;

  function sendReminder(recipientsIds, event) {
    var reminderData = {
      recipients: filterSelectedParticipants(recipientsIds, event.participants),
      event: {
        id: event.id,
        name: event.name,
        link: $state.href("event.results", null, {absolute: true})
      }
    };
    return Reminders.send(reminderData)
      .then(function () {
        model.recipientsIds = [];
        notificationService.success("REMINDER_REQUEST_SUCCESS");
      })
      .catch(function () {
        notificationService.error("REMINDER_REQUEST_ERROR");
      });
  }

  function filterSelectedParticipants(recipientsIds, participants) {
    return participants.filter(function (participant) {
      return recipientsIds.indexOf(participant.id) >= 0;
    });
  }
}

module.exports = ReminderController;
