"use strict";

var httpUtils = require("../../../utils/http");

/* @ngInject */
function ReminderResource($http) {
  return {
    send: send
  };

  function send(reminderData) {
    return $http.post("/reminders", reminderData).then(httpUtils.forwardResponseData);
  }
}

module.exports = ReminderResource;
