"use strict";

/* @ngInject */
function AddParticipantController($stateParams, $modalInstance, Events, Expenses) {
  var model = this;

  model.participant = {share: 1};

  model.add = add;
  model.cancel = cancel;

  activate();

  function add(participant) {
    delete model.errors;
    model.loading = true;
    Events.addParticipant($stateParams.id, participant)
      .then(function () {
        $modalInstance.close(true);
      })
      .catch(function (errors) {
        model.errors = errors;
      })
      .finally(function () {
        model.loading = false;
      });
  }

  function cancel() {
    $modalInstance.close(false);
  }

  function activate() {
    Expenses.metadata($stateParams.id).then(function (data) {
      model.expensesMetadata = data;
    });
  }
}

module.exports = AddParticipantController;
