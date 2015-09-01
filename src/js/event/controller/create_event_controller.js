"use strict";

/* @ngInject */
function CreateEventController(Events, $state) {
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
    Events.create(event)
      .then(redirectToEventPage)
      .catch(extractMessagesFromError);
  }

  function redirectToEventPage(data) {
    $state.go("event.details", {id: data.id});
  }

  function extractMessagesFromError(error) {
    model.errors = (error.status === 400) ? error.data.errors : [{message: "CREATE_EVENT_DEFAULT_ERROR"}];
  }
}

module.exports = CreateEventController;