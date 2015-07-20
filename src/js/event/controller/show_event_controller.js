"use strict";

var _ = require("underscore");

/* @ngInject */
function ShowEventController(event) {
  this.event = event;
  this.stringifyParticipantsNames = stringifyParticipantsNames;

  function stringifyParticipantsNames () {
    return _.collect(event.participants, function (participant) {
      return participant.name;
    }).join(", ");
  }
}

module.exports = ShowEventController;