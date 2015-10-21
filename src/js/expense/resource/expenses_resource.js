"use strict";

/* @ngInject */
function ExpensesResource($http) {
  return {
    add: add,
    delete: deleteExpense,
    fetch: fetch,
    fetchWithCount: fetchWithCount,
    metadata: metadata
  };

  function add(eventId, expense) {
    return $http.post("/api/events/" + eventId + "/expenses", expense).then(forwardResponseData);
  }

  function deleteExpense(eventId, expenseId) {
    return $http.delete("/api/events/" + eventId + "/expenses/" + expenseId);
  }

  function fetch(eventId, skip, limit, withCount) {
    withCount = withCount || false;
    var url = "/api/events/" + eventId + "/expenses?skip=" + skip + "&limit=" + limit;
    return $http.get(url).then(function (response) {
      return withCount ? {expenseCount: response.data.expenseCount, expenses: response.data.expenses} :
        response.data.expenses;
    });
  }

  function fetchWithCount(eventId, skip, limit) {
    return fetch(eventId, skip, limit, true);
  }

  function metadata(eventId) {
    return $http.get("/api/events/" + eventId + "/expenses/meta").then(forwardResponseData);
  }

  function forwardResponseData(response) {
    return response.data;
  }
}

module.exports = ExpensesResource;