"use strict";

var parseLinks = require("parse-link-header");
var getProperty = require("lodash/get");

/* @ngInject */
function RestService($http, $q) {
  var service = this;

  service.delete = httpDelete;
  service.get = get;
  service.patch = patch;
  service.post = post;
  service.put = put;

  function httpDelete(uri, configuration) {
    return dataPromise($http.delete(uri, configuration || {}));
  }

  function get(uri, configuration) {
    return dataPromise($http.get(uri, configuration || {}));
  }

  function patch(uri, data, configuration) {
    return dataPromise($http.patch(uri, data, configuration || {}));
  }

  function post(uri, data, configuration) {
    return dataPromise($http.post(uri, data, configuration || {}));
  }

  function put(uri, data, configuration) {
    return dataPromise($http.put(uri, data, configuration || {}));
  }

  function dataPromise(httpPromise) {
    return httpPromise
      .then(function (response) {
        if (getProperty(response, "config.withLinkObject")) {
          return {
            data: response.data,
            links: parseLinks(response.headers("Link"))
          };
        }
        return response.data;
      })
      .catch(function (response) {
        return $q.reject(response.data);
      });
  }
}

module.exports = RestService;
