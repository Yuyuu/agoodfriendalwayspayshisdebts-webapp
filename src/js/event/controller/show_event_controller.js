"use strict";

/* @ngInject */
function ShowEventController(EventsService, event) {
  this.event = event;

  this.stringifyEventParticipantsNames = stringifyEventParticipantsNames;
  this.findPurchaserName = findPurchaserName;
  this.stringifyExpenseParticipantsNames = stringifyExpenseParticipantsNames;

  function stringifyEventParticipantsNames () {
    var eventParticipantsNames = EventsService.findEventParticipantsNames(event);
    return eventParticipantsNames.join(", ");
  }

  function findPurchaserName(purchaserId) {
    return EventsService.findParticipantName(event, purchaserId);
  }

  function stringifyExpenseParticipantsNames(participantsIds) {
    var expenseParticipantsNames = EventsService.findExpenseParticipantsNames(event, participantsIds);
    return expenseParticipantsNames.join(", ");
  }
}

module.exports = ShowEventController;