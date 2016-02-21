'use strict';

export default class HistoryController {

  /* @ngInject */
  constructor($stateParams, Activity) {
    this._$stateParams = $stateParams;
    this._Activity = Activity;
    this._page = 1;

    this.filter = 'reminders';
    this.filters = [
      {name: 'expenses', translation: 'app.history.expenses.label'},
      {name: 'participants', translation: 'app.history.participants.label'},
      {name: 'reminders', translation: 'app.history.reminders.label'}
    ];
    this._activate();
  }

  loadMore() {
    this._page++;
    this._loadHistory(summaries => summaries.forEach(summary => this.summaries.push(summary)));
  }

  refresh() {
    this._page = 1;
    this._loadHistory(summaries => this.summaries = summaries);
  }

  _activate() {
    this._loadHistory(summaries => this.summaries = summaries);
  }

  _loadHistory(extractSummaries) {
    this.loading = true;
    return this._Activity.getWithFilter(this._$stateParams.id, this._page, this.filter)
      .then(summaries => {
        this.allLoaded = summaries.length < 3;
        return summaries;
      })
      .then(extractSummaries)
      .finally(() => this.loading = false);
  }
}
