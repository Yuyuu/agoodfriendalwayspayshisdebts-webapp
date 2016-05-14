"use strict";

var getProperty = require("lodash/get");

/* @ngInject */
function ActivityResource(restService) {
  var resource = this;

  resource._nextUrl = undefined;

  return {
    get: get,
    hasNext: hasNext,
    next: next
  };

  function get(eventId) {
    return getWithLink("/api/events/" + eventId + "/activity?page=1");
  }

  function hasNext() {
    return resource._nextUrl !== undefined;
  }

  function next() {
    return getWithLink("/api" + resource._nextUrl);
  }

  function getWithLink(url) {
    return restService.get(url, {withLinkObject: true}).then(function (response) {
      resource._nextUrl = getProperty(response.links, "next.url");
      return response.data.items;
    });
  }
}

module.exports = ActivityResource;
