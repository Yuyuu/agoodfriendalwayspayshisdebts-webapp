"use strict";

/* @ngInject */
function ExpensesResource($http) {
  return {
    metadata: function (eventId) {
      return $http.get("/api/events/" + eventId + "/expenses/meta").then(forwardResponseData);
    },
    fetchWithCount: function (eventId, skip, limit) {
      return this.fetch(eventId, skip, limit, true);
    },
    fetch: function (eventId, skip, limit, withCount) {
      withCount = withCount || false;
      var url = "/api/events/" + eventId + "/expenses?skip=" + skip + "&limit=" + limit;
      return $http.get(url).then(function (response) {
        return withCount ? {expenseCount: response.data.expenseCount, expenses: response.data.expenses} :
          response.data.expenses;
      });
    },
    add: function (eventId, expense) {
      return $http.post("/api/events/" + eventId + "/expenses", expense).then(forwardResponseData);
    },
    delete: function (eventId, expenseId) {
      return $http.delete("/api/events/" + eventId + "/expenses/" + expenseId);
    }
  };

  function forwardResponseData(response) {
    return response.data;
  }
}

module.exports = ExpensesResource;