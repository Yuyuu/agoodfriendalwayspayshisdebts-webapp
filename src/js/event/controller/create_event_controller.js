"use strict";

/* @ngInject */
function CreateEventController($state, Events, Currencies) {
  var model = this;

  model.currencies = Currencies;
  model.event = {currency: "€", participants: [{email: "", share: 1}]};

  model.addParticipant = addParticipant;
  model.createEvent = createEvent;
  model.removeParticipant = removeParticipant;

  function addParticipant() {
    model.event.participants.push({email: "", share: 1});
  }

  function createEvent(event) {
    delete model.errors;
    return Events.create(event)
      .then(redirectToEventPage)
      .catch(extractErrors);
  }

  function removeParticipant(index) {
    model.event.participants.splice(index, 1);
  }

  function redirectToEventPage(data) {
    return $state.go("event.expenses", {id: data.id});
  }

  function extractErrors(errors) {
    model.errors = errors;
  }
}

module.exports = CreateEventController;