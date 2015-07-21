"use strict";

/* @ngInject */
function PurchasesResource($resource) {
  return $resource("/api/events/:eventId/purchases", {eventId: "@eventId"}, {
    add: {method: "POST"}
  });
}

module.exports = PurchasesResource;