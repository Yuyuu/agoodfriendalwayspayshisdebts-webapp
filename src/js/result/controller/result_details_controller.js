"use strict";

/* @ngInject */
function ResultDetailsController($routeParams, EventsService, Events, Results) {
  var model = this;

  model.event = {};
  model.result = {};

  model.findParticipantName = findParticipantName;

  activate();

  function findParticipantName(participantId) {
    return EventsService.findParticipantName(model.event, participantId);
  }

  function activate() {
    Events.get({id: $routeParams.id}, function (data) {
      model.event = data;
      return model.event;
    });

    Results.get($routeParams.id).then(function (data) {
      model.result = data;
      return model.result;
    });
  }
}

module.exports = ResultDetailsController;