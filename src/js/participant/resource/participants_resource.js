"use strict";

var httpUtils = require("../../utils/http");

/* @ngInject */
function ParticipantsResource($http, $q) {
  return {
    update: update
  };

  function update(eventId, participant) {
    var url = "/api/events/" + eventId + "/participants/" + participant.id;
    return httpUtils.forwardErrorsIfAny($q, $http.put(url, participant));
  }
}

module.exports = ParticipantsResource;
