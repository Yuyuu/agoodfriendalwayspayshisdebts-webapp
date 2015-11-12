"use strict";

var httpUtils = require("../../utils/http");

/* @ngInject */
function ActivityResource($http) {
  return {
    get: get
  };

  function get(eventId, page) {
    return $http.get("/api/events/" + eventId + "/activity?page=" + page).then(httpUtils.forwardResponseData);
  }
}

module.exports = ActivityResource;
