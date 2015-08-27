"use strict";

/* @ngInject */
function ResultDetailsController($routeParams, Events, Results) {
  var model = this;

  model.event = {};
  model.result = {};

  activate();

  function activate() {
    Events.get($routeParams.id).then(function (data) {
      model.event = data;
      return model.event;
    });

    Results.get($routeParams.id).then(function (data) {
      model.result = data;
      return model.result;
    });
  }
}

module.exports = ResultDetailsController;