"use strict";

/* @ngInject */
function ActivityController($stateParams, Activity) {
  var model = this;

  activate();

  function activate() {
    Activity.get($stateParams.id).then(function (operations) {
      model.operations = operations;
    });
  }
}

module.exports = ActivityController;
