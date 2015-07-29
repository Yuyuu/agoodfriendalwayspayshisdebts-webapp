"use strict";

/* @ngInject */
function DefaultErrorInterceptorService($q, $location) {
  return {
    responseError: function (rejection) {
      $location.path("/error");
      return $q.reject(rejection);
    }
  };
}

module.exports = DefaultErrorInterceptorService;