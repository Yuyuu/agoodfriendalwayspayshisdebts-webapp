"use strict";

var _ = require("underscore");

/* @ngInject */
function EventService() {
  this.findParticipantName = findParticipantName;
  this.findEventParticipantsNames = findEventParticipantsNames;

  function findParticipantName(event, participantId) {
    var participant = _.find(event.participants, function (participant) {
      return participant.id === participantId;
    });

    return participant.name;
  }

  function findEventParticipantsNames(event) {
    return _.collect(event.participants, function (participant) {
      return participant.name;
    });
  }
}

module.exports = EventService;