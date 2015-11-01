"use strict";

/* @ngInject */
function ParticipantsController(modalService, notificationService) {
  var model = this;

  model.edit = edit;

  var editParticipantModalOptions = {
    templateUrl: "/templates/modal/edit_participant",
    controller: "EditParticipantController",
    controllerAs: "model"
  };

  function edit(participant) {
    editParticipantModalOptions.resolve = {participant: function () {
      return participant;
    }};
    var modalInstance = modalService.open(editParticipantModalOptions);
    modalInstance.result.then(function (updatedParticipant) {
      if (updatedParticipant) {
        updateParticipant(participant, updatedParticipant);
        notificationService.success("PARTICIPANT_UPDATED_SUCCESS");
      }
    });
  }

  function updateParticipant(participant, updatedParticipant) {
    participant.email = updatedParticipant.email;
  }
}

module.exports = ParticipantsController;
