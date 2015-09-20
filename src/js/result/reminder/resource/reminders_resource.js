"use strict";

/* @ngInject */
function ReminderResource($http) {
  return {
    send: function (eventId, recipientsIds) {
      return $http.post("/api/events/" + eventId + "/reminder", recipientsIds).then(function (response) {
        return response.data.response;
      });
    }
  };
}

module.exports = ReminderResource;
