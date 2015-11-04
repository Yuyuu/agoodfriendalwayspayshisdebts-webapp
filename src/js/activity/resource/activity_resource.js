"use strict";

var httpUtils = require("../../utils/http");

/* @ngInject */
function ActivityResource($http) {
  return {
    get: get
  };

  function get(eventId) {
    return $http.get("/api/events/" + eventId + "/activity").then(httpUtils.forwardResponseData);
  }
}

module.exports = ActivityResource;
