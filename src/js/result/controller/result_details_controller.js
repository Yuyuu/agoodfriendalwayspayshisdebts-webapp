"use strict";

/* @ngInject */
function ResultDetailsController($stateParams, Events, Results) {
  var model = this;

  activate();

  function activate() {
    Events.get($stateParams.id).then(function (data) {
      model.event = data;
    });

    Results.get($stateParams.id).then(function (data) {
      model.result = data;
    });
  }
}

module.exports = ResultDetailsController;