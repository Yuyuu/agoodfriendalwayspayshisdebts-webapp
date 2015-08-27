"use strict";

/* @ngInject */
function ShowEventController($routeParams, Events) {
  var model = this;

  model.event = {};

  activate();

  function activate() {
    return Events.get($routeParams.id).then(function (data) {
      model.event = data;
      return model.event;
    });
  }
}

module.exports = ShowEventController;