"use strict";

/* @ngInject */
function DefaultErrorInterceptorService($q, $location) {
  return {
    responseError: function (rejection) {
      if (500 === rejection.status) {
        $location.path("/error");
      }
      return $q.reject(rejection);
    }
  };
}

module.exports = DefaultErrorInterceptorService;