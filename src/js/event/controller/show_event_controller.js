"use strict";

var _ = require("underscore");

/* @ngInject */
function ShowEventController(event) {
  this.event = event;
  this.stringifyParticipantsNames = stringifyParticipantsNames;
  this.findPurchaserName = findPurchaserName;
  this.findPurchaseParticipantsNames = findPurchaseParticipantsNames;

  function stringifyParticipantsNames () {
    return _.collect(event.participants, function (participant) {
      return participant.name;
    }).join(", ");
  }

  function findPurchaserName(purchaserId) {
    var purchaser = _.find(event.participants, function (participant) {
      return participant.id === purchaserId;
    });

    return purchaser.name;
  }

  function findPurchaseParticipantsNames(participantsIds) {
    var purchaseParticipants = _.filter(event.participants, function (participant) {
      return participantsIds.indexOf(participant.id) !== -1;
    });

    var purchaseParticipantsNames = _.collect(purchaseParticipants, function (participant) {
      return participant.name;
    });

    return purchaseParticipantsNames.join(", ");
  }
}

module.exports = ShowEventController;