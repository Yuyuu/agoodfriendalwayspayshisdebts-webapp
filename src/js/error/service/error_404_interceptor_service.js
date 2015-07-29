"use strict";

/* @ngInject */
function Error404InterceptorService($q, $location) {
  return {
    responseError: function (rejection) {
      if (rejection.status === 404) {
        $location.path("/404");
      }
      return $q.reject(rejection);
    }
  };
}

module.exports = Error404InterceptorService;