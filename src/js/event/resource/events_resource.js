"use strict";

/* @ngInject */
function EventsResource($http, $q) {
  return {
    get: function (eventId) {
      return $http.get("/api/events/" + eventId + "/meta").then(forwardResponseData);
    },
    create: function (event) {
      return $http.post("/api/events", event).then(forwardResponseData);
    },
    addParticipant: function (eventId, participant) {
      return $http.post("/api/events/" + eventId + "/participants", participant).catch(function (response) {
        var errors = (400 === response.status) ? response.data.errors : [{message: "ADD_PARTICIPANT_DEFAULT_ERROR"}];
        return $q.reject(errors);
      });
    }
  };

  function forwardResponseData(response) {
    return response.data;
  }
}

module.exports = EventsResource;