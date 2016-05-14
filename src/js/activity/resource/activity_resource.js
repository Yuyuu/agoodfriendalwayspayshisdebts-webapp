"use strict";

/* @ngInject */
function ActivityResource(restService) {
  return {
    get: get
  };

  function get(eventId, page) {
    return restService.get("/api/events/" + eventId + "/activity?filter=all&page=" + page);
  }
}

module.exports = ActivityResource;
