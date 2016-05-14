"use strict";

var assign = require("lodash/assign");

/* @ngInject */
function EditParticipantController($stateParams, $modalInstance, Participants, participant) {
  var model = this;

  model.participant = assign({}, participant);

  model.cancel = cancel;
  model.update = update;

  function cancel() {
    $modalInstance.close(null);
  }

  function update(participant) {
    return Participants.update($stateParams.id, participant)
      .then(function () {
        $modalInstance.close(participant);
      })
      .catch(function (errors) {
        model.errors = errors;
      })
      .finally(function () {
        model.loading = false;
      });
  }
}

module.exports = EditParticipantController;
