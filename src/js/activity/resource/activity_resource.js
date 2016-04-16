"use strict";

/* @ngInject */
function ActivityResource(restService) {
  return {
    get: get,
    getWithFilter: getWithFilter
  };

  function get(eventId, page) {
    return restService.get("/api/events/" + eventId + "/activity?filter=all&page=" + page);
  }

  function getWithFilter(eventId, filter, page) {
    return restService.get("/api/events/" + eventId + "/activity?filter=" + filter + "&page=" + page);
  }
}

module.exports = ActivityResource;
