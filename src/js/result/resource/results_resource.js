"use strict";

/* @ngInject */
function ResultsResource($http) {
  return {
    get: function (eventId) {
      return $http.get("/api/events/" + eventId + "/results").then(function (response) {
        return response.data;
      });
    }
  };
}

module.exports = ResultsResource;