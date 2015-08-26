"use strict";

/* @ngInject */
function DefaultErrorInterceptorService($q, $location) {
  return {
    responseError: function (rejection) {
      var status = rejection.status;
      if ((status >= 500) && (status <= 599)) {
        $location.path("/error");
      }
      return $q.reject(rejection);
    }
  };
}

module.exports = DefaultErrorInterceptorService;