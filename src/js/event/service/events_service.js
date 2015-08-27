"use strict";

var _ = require("underscore");

/* @ngInject */
function EventService() {
  this.findEventParticipantsNames = findEventParticipantsNames;

  function findEventParticipantsNames(event) {
    return _.collect(event.participants, function (participant) {
      return participant.name;
    });
  }
}

module.exports = EventService;