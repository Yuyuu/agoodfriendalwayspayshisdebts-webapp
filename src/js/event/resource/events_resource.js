"use strict";

/* @ngInject */
function EventsResource($resource) {
  return $resource("/api/events/:id", {id: "@id"}, {
    get: {method: "GET", isArray: false},
    create: {method: "POST"}
  });
}

module.exports = EventsResource;