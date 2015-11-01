"use strict";

var httpUtils = require("../../utils/http");

/* @ngInject */
function ParticipantsResource($http, $q) {
  return {
    add: add,
    update: update
  };

  function add(eventId, participant) {
    var promise = httpUtils.forwardErrorsIfAny($q, $http.post("/api/events/" + eventId + "/participants", participant));
    return promise.then(httpUtils.forwardResponseData);
  }

  function update(eventId, participant) {
    var url = "/api/events/" + eventId + "/participants/" + participant.id;
    return httpUtils.forwardErrorsIfAny($q, $http.put(url, participant));
  }
}

module.exports = ParticipantsResource;
