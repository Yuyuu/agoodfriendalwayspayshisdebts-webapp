"use strict";

var httpUtils = require("../../../utils/http");

/* @ngInject */
function ReminderResource($http) {
  return {
    send: send
  };

  function send(eventId, reminderData) {
    return $http.post("/api/events/" + eventId + "/reminders", reminderData).then(httpUtils.forwardResponseData);
  }
}

module.exports = ReminderResource;
