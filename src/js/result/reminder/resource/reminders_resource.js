"use strict";

/* @ngInject */
function ReminderResource(restService) {
  return {
    send: send
  };

  function send(reminderData) {
    return restService.post("/reminders", reminderData);
  }
}

module.exports = ReminderResource;
