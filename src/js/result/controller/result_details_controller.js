"use strict";

var _ = require("underscore");

/* @ngInject */
function ResultDetailsController(event, results) {
  this.event = event;
  this.results = results;

  this.findParticipantName = findParticipantName;

  function findParticipantName(participantId) {
    var participant = _.find(event.participants, function (participant) {
      return participant.id === participantId;
    });

    return participant.name;
  }
}

module.exports = ResultDetailsController;