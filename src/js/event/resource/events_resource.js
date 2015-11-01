"use strict";

var httpUtils = require("../../utils/http");

/* @ngInject */
function EventsResource($http, $q) {
  return {
    create: create,
    get: get
  };

  function create(event) {
    var promise = httpUtils.forwardErrorsIfAny($q, $http.post("/api/events", event));
    return promise.then(httpUtils.forwardResponseData);
  }

  function get(eventId) {
    return $http.get("/api/events/" + eventId + "/meta").then(httpUtils.forwardResponseData);
  }
}

module.exports = EventsResource;