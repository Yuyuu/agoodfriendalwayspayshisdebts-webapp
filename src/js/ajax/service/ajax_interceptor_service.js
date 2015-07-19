"use strict";

/* @ngInject */
function AjaxInterceptorService($rootScope, $q, AppEvents) {
  return {
    request: function (config) {
      $rootScope.$broadcast(AppEvents.HTTP.REQUEST_STARTED);
      return config || $q.when(config);
    },
    response: function (response) {
      $rootScope.$broadcast(AppEvents.HTTP.REQUEST_ENDED);
      return response || $q.when(response);
    },
    responseError: function (rejection) {
      $rootScope.$broadcast(AppEvents.HTTP.REQUEST_ENDED);
      return $q.reject(rejection);
    }
  };
}

module.exports = AjaxInterceptorService;