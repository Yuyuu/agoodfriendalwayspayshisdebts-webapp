"use strict";

/* @ngInject */
function ResultsResource($http) {
  return {
    get: function (eventId) {
      return $http.get("/api/events/" + eventId + "/result").then(function (response) {
        return response.data.participantsResults;
      });
    }
  };
}

module.exports = ResultsResource;