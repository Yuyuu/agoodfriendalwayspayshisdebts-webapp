"use strict";

var httpUtils = require("../../utils/http");

/* @ngInject */
function ActivityResource($http) {
  return {
    get: get,
    getWithFilter: getWithFilter
  };

  function get(eventId, page) {
    var url = "/api/events/" + eventId + "/activity?filter=all&page=" + page;
    return $http.get(url).then(httpUtils.forwardResponseData);
  }

  function getWithFilter(eventId, filter, page) {
    var url = "/api/events/" + eventId + "/activity?filter=" + filter + "&page=" + page;
    return $http.get(url).then(httpUtils.forwardResponseData);
  }
}

module.exports = ActivityResource;
