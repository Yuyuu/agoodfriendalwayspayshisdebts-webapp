"use strict";

var _ = require("underscore");

/* @ngInject */
function HistoryController($stateParams, History) {
  var model = this;

  model.summaries = [];
  model.type = "reminders";
  model.types = [
    {name: "expenses", translation: "app.history.expenses"},
    {name: "participants", translation: "app.history.participants"},
    {name: "reminders", translation: "app.history.reminders"}
  ];

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
    if (summaries.length < 3) {
      model.allLoaded = true;
    }
    _.each(summaries, function (summary) {
      model.summaries.push(summary);
    });
  }

  function loadHistory() {
    model.loading = true;
    return History.get($stateParams.id, model.type, page).then(extractSummaries).finally(stopLoading);
  }

  function stopLoading() {
    model.loading = false;
  }
}

Object.defineProperty(HistoryController.prototype,
  "isEmpty", {
    enumerable: true,
    cofigurable: false,
    get: function () {
      return this.summaries.length === 0;
    }
});

module.exports = HistoryController;
