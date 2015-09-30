"use strict";

/* @ngInject */
function ShowEventController($stateParams, $modal, Events) {
  var model = this;

  model.addParticipant = addParticipant;

  var addParticipantModalOptions = {
    templateUrl: "/templates/modal/add_participant",
    controller: "AddParticipantController",
    controllerAs: "model"
  };

  activate();

  function addParticipant() {
    $modal.open(addParticipantModalOptions);
  }

  function activate() {
    Events.get($stateParams.id).then(function (event) {
      model.event = event;
    });
  }
}

module.exports = ShowEventController;