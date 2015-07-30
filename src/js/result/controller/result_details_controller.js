"use strict";

/* @ngInject */
function ResultDetailsController(EventsService, event, results) {
  this.event = event;
  this.results = results;

  this.findParticipantName = findParticipantName;

  function findParticipantName(participantId) {
    return EventsService.findParticipantName(event, participantId);
  }
}

module.exports = ResultDetailsController;