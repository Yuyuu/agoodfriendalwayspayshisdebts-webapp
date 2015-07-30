"use strict";

/* @ngInject */
function ShowEventController(EventsService, event) {
  this.event = event;

  this.stringifyEventParticipantsNames = stringifyEventParticipantsNames;
  this.findPurchaserName = findPurchaserName;
  this.stringifyPurchaseParticipantsNames = stringifyPurchaseParticipantsNames;

  function stringifyEventParticipantsNames () {
    var eventParticipantsNames = EventsService.findEventParticipantsNames(event);
    return eventParticipantsNames.join(", ");
  }

  function findPurchaserName(purchaserId) {
    return EventsService.findParticipantName(event, purchaserId);
  }

  function stringifyPurchaseParticipantsNames(participantsIds) {
    var purchaseParticipantsNames = EventsService.findPurchaseParticipantsNames(event, participantsIds);
    return purchaseParticipantsNames.join(", ");
  }
}

module.exports = ShowEventController;