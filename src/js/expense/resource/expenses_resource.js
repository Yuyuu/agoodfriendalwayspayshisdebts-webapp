"use strict";

var getProperty = require("lodash/get");

/* @ngInject */
function ExpensesResource(restService) {
  var resource = this;

  resource._nextMetadataUrl = undefined;
  resource._nextUrl = undefined;

  return {
    add: add,
    delete: deleteExpense,
    fetch: fetch,
    hasNext: hasNext,
    hasNextMetadata: hasNextMetadata,
    metadata: metadata,
    next: next,
    nextMetadata: nextMetadata
  };

  function add(eventId, expense) {
    return restService.post("/api/events/" + eventId + "/expenses", expense);
  }

  function deleteExpense(eventId, expenseId) {
    return restService.delete("/api/events/" + eventId + "/expenses/" + expenseId);
  }

  function fetch(eventId) {
    return getWithLink("/api/events/" + eventId + "/expenses?page=1", "_nextUrl");
  }

  function hasNext() {
    return resource._nextUrl !== undefined;
  }

  function hasNextMetadata() {
    return resource._nextMetadataUrl !== undefined;
  }

  function metadata(eventId) {
    return getWithLink("/api/events/" + eventId + "/expenses?format=meta&page=1", "_nextMetadataUrl");
  }

  function next() {
    return getWithLink("/api" + resource._nextUrl, "_nextUrl");
  }

  function nextMetadata() {
    return getWithLink("/api" + resource._nextMetadataUrl, "_nextMetadataUrl");
  }

  function getWithLink(url, nextUrlProperty) {
    return restService.get(url, {withLinkObject: true}).then(function (response) {
      resource[nextUrlProperty] = getProperty(response.links, "next.url");
      return response.data.items;
    });
  }
}

module.exports = ExpensesResource;