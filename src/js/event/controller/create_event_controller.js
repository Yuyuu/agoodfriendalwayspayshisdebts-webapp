"use strict";

/* @ngInject */
function CreateEventController($state, Events) {
  var model = this;

  model.event = {participants: [{email: "", share: 1}]};

  model.addParticipant = addParticipant;
  model.createEvent = createEvent;
  model.removeParticipant = removeParticipant;

  function addParticipant() {
    model.event.participants.push({email: "", share: 1});
  }

  function createEvent(event) {
    delete model.errors;
    Events.create(event)
      .then(redirectToEventPage)
      .catch(extractErrors);
  }

  function removeParticipant(index) {
    model.event.participants.splice(index, 1);
  }

  function redirectToEventPage(data) {
    $state.go("event.expenses", {id: data.id});
  }

  function extractErrors(errors) {
    model.errors = errors;
  }
}

module.exports = CreateEventController;