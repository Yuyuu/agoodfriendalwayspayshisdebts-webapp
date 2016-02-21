'use strict';

import httpUtils from '../../utils/http';

export default class EventsResource {
  /* @ngInject */
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  create(event) {
    let promise = httpUtils.forwardErrorsIfAny(this.$q, this.$http.post('/api/events', event));
    return promise.then(httpUtils.forwardResponseData);
  }

  get(eventId) {
    return this.$http.get(`/api/events/${eventId}/meta`).then(httpUtils.forwardResponseData);
  }
}
