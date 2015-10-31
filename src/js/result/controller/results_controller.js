"use strict";

/* @ngInject */
function ResultDetailsController($stateParams, Results) {
  var model = this;

  model.filter = {};

  activate();

  function activate() {
    model.loading = true;
    Results.get($stateParams.id)
      .then(function (data) {
        model.results = data;
      })
      .finally(function () {
        model.loading = false;
      });
  }
}

module.exports = ResultDetailsController;