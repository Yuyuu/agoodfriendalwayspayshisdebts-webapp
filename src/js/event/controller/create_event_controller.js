"use strict";

/* @ngInject */
function CreateEventController(Events, $window) {
  var model = this;

  model.event = {name: "", participants: [{name:"", email: "", share: 1}]};

  model.addParticipant = addParticipant;
  model.createEvent = createEvent;
  model.removeParticipant = removeParticipant;

  function addParticipant() {
    model.event.participants.push({name:"", email: "", share: 1});
  }

  function removeParticipant(index) {
    model.event.participants.splice(index, 1);
  }

  function createEvent(event) {
    delete model.errors;
    Events.create(event, redirectToEventPage, extractMessagesFromError);
  }

  function redirectToEventPage(event) {
    $window.location = "#/events/" + event.id + "/dashboard";
  }

  function extractMessagesFromError(error) {
    model.errors = (error.status === 400) ? error.data.errors : [{message: "CREATE_EVENT_DEFAULT_ERROR"}];
  }
}

module.exports = CreateEventController;