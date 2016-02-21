'use strict';

/* @ngInject */
export default class ActivityController {

  constructor($stateParams, Activity) {
    this._$stateParams = $stateParams;
    this._Activity = Activity;
    this._page = 1;
    this.operations = [];
    this._activate();
  }

  loadMore() {
    this._page++;
    this.loading = true;
    this._Activity.get(this._$stateParams.id, this._page)
      .then(this._extractOperations.bind(this))
      .finally(() => this.loading = false);
  }

  _activate() {
    this.loading = true;
    this._Activity.get(this._$stateParams.id, 1)
      .then(this._extractOperations.bind(this))
      .finally(() => this.loading = false);
  }

  _extractOperations(operations) {
    if (operations.length < 10) {
      this.allLoaded = true;
    }
    operations.forEach(operation => this.operations.push(operation));
  }
}
