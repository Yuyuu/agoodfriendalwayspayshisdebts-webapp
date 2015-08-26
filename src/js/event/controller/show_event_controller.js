"use strict";

/* @ngInject */
function ShowEventController($routeParams, EventsService, Events) {
  var model = this;

  model.event = {};

  model.stringifyEventParticipantsNames = stringifyEventParticipantsNames;

  activate();

  function stringifyEventParticipantsNames () {
    var eventParticipantsNames = EventsService.findEventParticipantsNames(model.event);
    return eventParticipantsNames.join(", ");
  }

  function activate() {
    return Events.get($routeParams.id).then(function (data) {
      model.event = data;
      return model.event;
    });
  }
}

module.exports = ShowEventController;