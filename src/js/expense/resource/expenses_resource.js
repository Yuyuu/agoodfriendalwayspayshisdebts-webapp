'use strict';

import httpUtils from '../../utils/http';

export default class ExpensesResource {

  /* @ngInject */
  constructor($http, $q) {
    this._$http = $http;
    this._$q = $q;
  }

  add(eventId, expense) {
    var promise = httpUtils.forwardErrorsIfAny(this._$q, this._$http.post(`/api/events/${eventId}/expenses`, expense));
    return promise.then(httpUtils.forwardResponseData);
  }

  delete(eventId, expenseId) {
    return this._$http.delete(`/api/events/${eventId}/expenses/${expenseId}`);
  }

  fetch(eventId, skip, limit, withCount=false) {
    var url = `/api/events/${eventId}/expenses?skip=${skip}&limit=${limit}`;
    return this._$http.get(url).then(response => {
      return withCount ? {expenseCount: response.data.expenseCount, expenses: response.data.expenses} :
        response.data.expenses;
    });
  }

  fetchWithCount(eventId, skip, limit) {
    return this.fetch(eventId, skip, limit, true);
  }

  metadata(eventId) {
    return this._$http.get(`/api/events/${eventId}/expenses/meta`).then(httpUtils.forwardResponseData);
  }
}
