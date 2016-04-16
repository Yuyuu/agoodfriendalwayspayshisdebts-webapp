"use strict";

/* @ngInject */
function EventsResource(restService) {
  return {
    create: create,
    get: get
  };

  function create(event) {
    return restService.post("/api/events", event);
  }

  function get(eventId) {
    return restService.get("/api/events/" + eventId);
  }
}

module.exports = EventsResource;