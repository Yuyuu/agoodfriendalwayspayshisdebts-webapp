"use strict";

/* @ngInject */
function ResultsResource(restService) {
  return {
    get: get
  };

  function get(eventId) {
    return restService.get("/api/events/" + eventId + "/results");
  }
}

module.exports = ResultsResource;