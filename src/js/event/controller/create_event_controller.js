"use strict";

var _ = require("underscore");

/* @ngInject */
function CreateEventController(Events, $window) {
  var it = this;
  this.event = {name: "", participants: [{name:"", email: "", share: 1}]};
  this.errors = undefined;

  this.eventIsValid = eventIsValid;
  this.addParticipant = addParticipant;
  this.removeParticipant = removeParticipant;
  this.createEvent = createEvent;

  function eventIsValid(event) {
    var everyParticipantIsValid = _.every(event.participants, function (participant) {
      return !!(participant.name && participant.share > 0);
    });
    return !!(event.name && everyParticipantIsValid);
  }

  function addParticipant() {
    it.event.participants.push({name:"", email: "", share: 1});
  }

  function removeParticipant(index) {
    it.event.participants.splice(index, 1);
  }

  function createEvent(event) {
    if (eventIsValid(event)) {
      event.participants = _.filter(event.participants, function (participant) {
        return !!(participant.name && participant.share > 0);
      });
      Events.create(event, redirectToEventPage, handleCreationError);
    }
  }

  function redirectToEventPage(event) {
    $window.location = "#/events/" + event.id;
  }

  function handleCreationError(error) {
    it.errors = (error.status === 400) ? error.data.errors : [{message: "CREATE_EVENT_DEFAULT_ERROR"}];
  }
}

module.exports = CreateEventController;