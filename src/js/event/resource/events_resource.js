"use strict";

/* @ngInject */
function EventsResource($http) {
  return {
    get: function (eventId) {
      return $http.get("/api/events/" + eventId).then(function (response) {
        return response.data;
      });
    },
    create: function (event) {
      return $http.post("/api/events", event).then(function (response) {
        return response.data;
      });
    }
  };
}

module.exports = EventsResource;