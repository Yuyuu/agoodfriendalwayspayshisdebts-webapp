"use strict";

var _ = require("underscore");

/* @ngInject */
function HistoryController($stateParams, Activity) {
  var model = this;

  model.filter = "reminders";
  model.filters = [
    {name: "expenses", translation: "app.history.expenses.label"},
    {name: "participants", translation: "app.history.participants.label"},
    {name: "reminders", translation: "app.history.reminders.label"}
  ];

  model.loadMore = loadMore;
  model.refresh = refresh;

  var page = 1;

  activate();

  function loadMore() {
    page++;
    return loadHistory(addSummaries);
  }

  function refresh() {
    page = 1;
    return loadHistory(initSummaries);
  }

  function activate() {
    model.activation = loadHistory(initSummaries);
  }

  function addSummaries(summaries) {
    _.each(summaries, function (summary) {
      model.summaries.push(summary);
    });
  }

  function initSummaries(summaries) {
    model.summaries = summaries;
  }

  function loadHistory(extractSummaries) {
    model.loading = true;
    return Activity.getWithFilter($stateParams.id, model.filter, page)
      .then(function checkIfAllLoaded(summaries) {
        model.allLoaded = summaries.length < 3;
        return summaries;
      })
      .then(extractSummaries)
      .finally(stopLoading);
  }

  function stopLoading() {
    model.loading = false;
  }
}

module.exports = HistoryController;
