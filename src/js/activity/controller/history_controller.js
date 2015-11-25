"use strict";

var _ = require("underscore");

/* @ngInject */
function HistoryController($stateParams, Activity) {
  var model = this;

  model.filter = "reminders";
  model.filters = [
    {name: "expenses", translation: "app.history.expenses"},
    {name: "participants", translation: "app.history.participants"},
    {name: "reminders", translation: "app.history.reminders"}
  ];
  model.summaries = [];

  model.loadMore = loadMore;
  model.change = change;

  var page = 1;

  activate();

  function loadMore() {
    page++;
    loadHistory();
  }

  function change() {
    model.summaries = [];
    page = 1;
    loadHistory();
  }

  function activate() {
    loadHistory();
  }

  function extractSummaries(summaries) {
    model.allLoaded = summaries.length < 3;
    _.each(summaries, function (summary) {
      model.summaries.push(summary);
    });
  }

  function loadHistory() {
    model.loading = true;
    return Activity.getWithFilter($stateParams.id, model.filter, page).then(extractSummaries).finally(stopLoading);
  }

  function stopLoading() {
    model.loading = false;
  }
}

module.exports = HistoryController;
