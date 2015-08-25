"use strict";

/* @ngInject */
function ResultDetailsController(EventsService, event, result) {
  this.event = event;
  this.result = result;

  this.findParticipantName = findParticipantName;

  function findParticipantName(participantId) {
    return EventsService.findParticipantName(event, participantId);
  }
}

module.exports = ResultDetailsController;