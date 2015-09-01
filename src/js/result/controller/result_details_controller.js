"use strict";

/* @ngInject */
function ResultDetailsController($stateParams, Results) {
  var model = this;

  activate();

  function activate() {
    Results.get($stateParams.id).then(function (data) {
      model.result = data;
    });
  }
}

module.exports = ResultDetailsController;