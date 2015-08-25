"use strict";

/* @ngInject */
function ShowEventController($routeParams, EventsService, Events) {
  var model = this;

  model.event = {};

  model.findPurchaserName = findPurchaserName;
  model.stringifyEventParticipantsNames = stringifyEventParticipantsNames;
  model.stringifyExpenseParticipantsNames = stringifyExpenseParticipantsNames;

  activate();

  function stringifyEventParticipantsNames () {
    var eventParticipantsNames = EventsService.findEventParticipantsNames(model.event);
    return eventParticipantsNames.join(", ");
  }

  function findPurchaserName(purchaserId) {
    return EventsService.findParticipantName(model.event, purchaserId);
  }

  function stringifyExpenseParticipantsNames(participantsIds) {
    var expenseParticipantsNames = EventsService.findExpenseParticipantsNames(model.event, participantsIds);
    return expenseParticipantsNames.join(", ");
  }

  function activate() {
    return Events.get({id: $routeParams.id}, function (data) {
      model.event = data;
      return model.event;
    });
  }
}

module.exports = ShowEventController;