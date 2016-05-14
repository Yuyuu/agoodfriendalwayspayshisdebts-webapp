"use strict";

/* @ngInject */
function ActivityController($stateParams, Activity) {
  var model = this;

  model._Activity = Activity;
  model.operations = [];

  model.loadMore = loadMore;

  activate();

  function loadMore() {
    model.loading = true;
    return Activity.next()
      .then(extractOperations)
      .finally(stopLoading);
  }

  function activate() {
    model.loading = true;
    model.activation = Activity.get($stateParams.id)
      .then(extractOperations)
      .finally(stopLoading);
  }

  function extractOperations(operations) {
    model.operations.push.apply(model.operations, operations);
  }

  function stopLoading() {
    model.loading = false;
  }
}

Object.defineProperty(ActivityController.prototype,
  "allLoaded", {
    enumerable: true,
    configurable: false,
    get: function () {
      return !this._Activity.hasNext();
    }
  }
);

module.exports = ActivityController;
