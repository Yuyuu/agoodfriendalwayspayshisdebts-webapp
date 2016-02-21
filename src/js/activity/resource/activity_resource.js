'use strict';

import httpUtils from '../../utils/http';

export default class ActivityResource {

  /* @ngInject */
  constructor($http) {
    this._$http = $http;
  }

  get(eventId, page, filter='all') {
    let url = `/api/events/${eventId}/activity?filter=${filter}&page=${page}`;
    return this._$http.get(url).then(httpUtils.forwardResponseData);
  }

  getWithFilter(eventId, page, filter) {
    return this.get(eventId, page, filter);
  }
}
