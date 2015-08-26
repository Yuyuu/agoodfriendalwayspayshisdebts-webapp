"use strict";

/* @ngInject */
function ExpensesResource($http) {
  return {
    add: function (data) {
      return $http.post("/api/events/" + data.eventId + "/expenses", data);
    }
  };
}

module.exports = ExpensesResource;