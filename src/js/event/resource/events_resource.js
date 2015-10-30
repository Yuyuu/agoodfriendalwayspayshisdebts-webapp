"use strict";

var httpUtils = require("../../utils/http");

/* @ngInject */
function EventsResource($http, $q) {
  return {
    addParticipant: addParticipant,
    create: create,
    get: get
  };

  function addParticipant(eventId, participant) {
    var promise = httpUtils.forwardErrorsIfAny($q, $http.post("/api/events/" + eventId + "/participants", participant));
    return promise.then(httpUtils.forwardResponseData);
  }

  function create(event) {
    var promise = httpUtils.forwardErrorsIfAny($q, $http.post("/api/events", event));
    return promise.then(httpUtils.forwardResponseData);
  }

  function get(eventId) {
    return $http.get("/api/events/" + eventId + "/meta").then(httpUtils.forwardResponseData);
  }
}

module.exports = EventsResource;