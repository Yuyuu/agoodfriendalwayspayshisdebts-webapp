"use strict";

/* @ngInject */
function EventsResource($resource) {
  return $resource("/api/events", {}, {
    create: {method: "POST"}
  });
}

module.exports = EventsResource;