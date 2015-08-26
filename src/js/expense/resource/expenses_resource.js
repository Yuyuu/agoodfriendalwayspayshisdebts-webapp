"use strict";

/* @ngInject */
function ExpensesResource($http) {
  return {
    fetch: function (eventId) {
      return $http.get("/api/events/" + eventId + "/expenses").then(function (response) {
        return response.data.expenses;
      });
    },
    add: function (data) {
      return $http.post("/api/events/" + data.eventId + "/expenses", data).then(function (response) {
        return response.data;
      });
    }
  };
}

module.exports = ExpensesResource;