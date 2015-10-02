"use strict";

/* @ngInject */
function ShowEventController($state, $modal, Events, notificationService) {
  var model = this;

  model.addParticipant = addParticipant;

  var addParticipantModalOptions = {
    templateUrl: "/templates/modal/add_participant",
    controller: "AddParticipantController",
    controllerAs: "model"
  };

  activate();

  function addParticipant() {
    var modalInstance = $modal.open(addParticipantModalOptions);
    modalInstance.result.then(function (isAdded) {
      if (isAdded) {
        $state.reload();
        notificationService.success("PARTICIPANT_ADDED_SUCCESS");
      }
    });
  }

  function activate() {
    Events.get($state.params.id).then(function (event) {
      model.event = event;
    });
  }
}

module.exports = ShowEventController;