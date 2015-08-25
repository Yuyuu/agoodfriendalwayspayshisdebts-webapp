"use strict";

/* @ngInject */
function CreateEventController(Events, $window) {
  var it = this;
  this.event = {name: "", participants: [{name:"", email: "", share: 1}]};

  this.addParticipant = addParticipant;
  this.removeParticipant = removeParticipant;
  this.createEvent = createEvent;

  function addParticipant() {
    it.event.participants.push({name:"", email: "", share: 1});
  }

  function removeParticipant(index) {
    it.event.participants.splice(index, 1);
  }

  function createEvent(event) {
    delete it.errors;
    Events.create(event, redirectToEventPage, extractMessagesFromError);
  }

  function redirectToEventPage(event) {
    $window.location = "#/events/" + event.id + "/dashboard";
  }

  function extractMessagesFromError(error) {
    it.errors = (error.status === 400) ? error.data.errors : [{message: "CREATE_EVENT_DEFAULT_ERROR"}];
  }
}

module.exports = CreateEventController;