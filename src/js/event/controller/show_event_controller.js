"use strict";

/* @ngInject */
function ShowEventController($state, modalService, notificationService, event) {
  var model = this;

  model.event = event;

  model.addParticipant = addParticipant;

  var addParticipantModalOptions = {
    templateUrl: "/templates/modal/add_participant",
    controller: "AddParticipantController",
    controllerAs: "model"
  };

  function addParticipant() {
    var modalInstance = modalService.open(addParticipantModalOptions);
    modalInstance.result.then(function (participant) {
      if (participant) {
        model.event.participants.push(participant);
        $state.reload($state.current);
        notificationService.success("PARTICIPANT_ADDED_SUCCESS");
      }
    });
  }
}

module.exports = ShowEventController;