"use strict";

/* @ngInject */
function ShowEventController($stateParams, Events) {
  var model = this;

  activate();

  function activate() {
    Events.get($stateParams.id).then(function (event) {
      model.event = event;
    });
  }
}

module.exports = ShowEventController;