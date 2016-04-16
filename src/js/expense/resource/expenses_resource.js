"use strict";

/* @ngInject */
function ExpensesResource(restService) {
  return {
    add: add,
    delete: deleteExpense,
    fetch: fetch,
    fetchWithCount: fetchWithCount,
    metadata: metadata
  };

  function add(eventId, expense) {
    return restService.post("/api/events/" + eventId + "/expenses", expense);
  }

  function deleteExpense(eventId, expenseId) {
    return restService.delete("/api/events/" + eventId + "/expenses/" + expenseId);
  }

  function fetch(eventId, skip, limit, withCount) {
    withCount = withCount || false;
    var url = "/api/events/" + eventId + "/expenses?skip=" + skip + "&limit=" + limit;
    return restService.get(url).then(function (data) {
      return withCount ? {expenseCount: data.expenseCount, expenses: data.expenses} : data.expenses;
    });
  }

  function fetchWithCount(eventId, skip, limit) {
    return fetch(eventId, skip, limit, true);
  }

  function metadata(eventId) {
    return restService.get("/api/events/" + eventId + "/expenses?format=meta");
  }
}

module.exports = ExpensesResource;