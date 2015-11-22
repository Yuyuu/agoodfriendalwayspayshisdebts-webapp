"use strict";

var httpUtils = require("../../utils/http");

/* @ngInject */
function HistoryResource($http) {
  return {
    get: get
  };

  function get(eventId, type, page) {
    var url = "/api/events/" + eventId + "/history?type=" + type + "&page=" + page;
    return $http.get(url).then(httpUtils.forwardResponseData);
  }
}

module.exports = HistoryResource;
