"use strict";

/* @ngInject */
function AddParticipantController($stateParams, $modalInstance, Events, Expenses) {
  var model = this;

  model.participant = {email: "", share: 1};

  model.add = add;
  model.cancel = cancel;
  model.hasExpenses = hasExpenses;

  activate();

  function add(participant) {
    delete model.errors;
    model.loading = true;
    Events.addParticipant($stateParams.id, participant)
      .then(function (data) {
        participant.id = data.id;
        $modalInstance.close(participant);
      })
      .catch(function (errors) {
        model.errors = errors;
      })
      .finally(function () {
        model.loading = false;
      });
  }

  function cancel() {
    $modalInstance.close(null);
  }

  function hasExpenses() {
    return model.expensesMetadata && model.expensesMetadata.length > 0;
  }

  function activate() {
    Expenses.metadata($stateParams.id).then(function (data) {
      model.expensesMetadata = data;
    });
  }
}

module.exports = AddParticipantController;
