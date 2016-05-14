"use strict";

/* @ngInject */
function AddParticipantController($stateParams, $modalInstance, Participants, Expenses) {
  var model = this;

  model.participant = {email: "", share: 1};

  model.add = add;
  model.cancel = cancel;

  activate();

  function add(participant) {
    delete model.errors;
    model.loading = true;
    return Participants.add($stateParams.id, participant)
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

  function activate() {
    model.activation = Expenses.metadata($stateParams.id).then(function (data) {
      model.expensesMetadata = data;
    });
  }
}

Object.defineProperty(AddParticipantController.prototype,
  "hasExpenses", {
    enumerable: true,
    configurable: false,
    get: function () {
      return this.expensesMetadata && this.expensesMetadata.length > 0;
    }
  }
);

module.exports = AddParticipantController;
