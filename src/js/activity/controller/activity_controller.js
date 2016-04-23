"use strict";

var _ = require("underscore");

/* @ngInject */
function ActivityController($stateParams, Activity) {
  var model = this;

  model.operations = [];

  model.loadMore = loadMore;

  var page = 1;

  activate();

  function loadMore() {
    page++;
    model.loading = true;
    return Activity.get($stateParams.id, page).then(extractOperations).finally(stopLoading);
  }

  function activate() {
    model.loading = true;
    model.activation = Activity.get($stateParams.id, 1).then(extractOperations).finally(stopLoading);
  }

  function extractOperations(operations) {
    if (operations.length < 10) {
      model.allLoaded = true;
    }
    _.each(operations, function (operation) {
      model.operations.push(operation);
    });
  }

  function stopLoading() {
    model.loading = false;
  }
}

module.exports = ActivityController;
