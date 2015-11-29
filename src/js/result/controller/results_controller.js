"use strict";

/* @ngInject */
function ResultDetailsController($stateParams, Results) {
  var model = this;

  model.filter = {};

  activate();

  function activate() {
    Results.get($stateParams.id).then(function (data) {
      model.results = data;
    });
  }
}

module.exports = ResultDetailsController;