"use strict";

/* @ngInject */
function ParticipantsResource($http, $q) {
  return {
    update: update
  };

  function update(eventId, participant) {
    var url = "/api/events/" + eventId + "/participants/" + participant.id;
    return $http.put(url, participant).catch(function (response) {
      var errors = (400 === response.status) ? response.data.errors : [{message: "EDIT_PARTICIPANT_DEFAULT_ERROR"}];
      return $q.reject(errors);
    });
  }
}

module.exports = ParticipantsResource;
