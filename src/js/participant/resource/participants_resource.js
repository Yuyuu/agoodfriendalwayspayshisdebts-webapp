"use strict";

/* @ngInject */
function ParticipantsResource(restService) {
  return {
    add: add,
    update: update
  };

  function add(eventId, participant) {
    return restService.post("/api/events/" + eventId + "/participants", participant);
  }

  function update(eventId, participant) {
    return restService.put("/api/events/" + eventId + "/participants/" + participant.id, participant);
  }
}

module.exports = ParticipantsResource;
