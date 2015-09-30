"use strict";

/* @ngInject */
function AddParticipantController($stateParams, $modalInstance, Expenses) {
  var model = this;

  model.participant = {share: 1};

  model.add = add;
  model.cancel = cancel;

  activate();

  function add() {
    $modalInstance.close(model.participant);
  }

  function cancel() {
    $modalInstance.close(null);
  }

  function activate() {
    Expenses.metadata($stateParams.id).then(function (data) {
      model.expensesMetadata = data;
    });
  }
}

module.exports = AddParticipantController;
