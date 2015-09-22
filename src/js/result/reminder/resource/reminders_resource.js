"use strict";

/* @ngInject */
function ReminderResource($http) {
  return {
    send: function (eventId, reminderData) {
      return $http.post("/api/events/" + eventId + "/reminder", reminderData).then(function (response) {
        return response.data.response;
      });
    }
  };
}

module.exports = ReminderResource;
