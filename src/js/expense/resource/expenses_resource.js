"use strict";

/* @ngInject */
function ExpensesResource($resource) {
  return $resource("/api/events/:eventId/expenses", {eventId: "@eventId"}, {
    add: {method: "POST"}
  });
}

module.exports = ExpensesResource;