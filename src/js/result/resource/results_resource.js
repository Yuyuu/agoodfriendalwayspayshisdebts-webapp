"use strict";

var httpUtils = require("../../utils/http");

/* @ngInject */
function ResultsResource($http) {
  return {
    get: get
  };

  function get(eventId) {
    return $http.get("/api/events/" + eventId + "/result").then(httpUtils.forwardResponseData);
  }
}

module.exports = ResultsResource;