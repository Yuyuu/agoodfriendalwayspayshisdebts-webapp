"use strict";

/* @ngInject */
function BootstrapService($rootScope, $state) {
  this.start = start;

  function start() {
    $rootScope.$on("$stateChangeError", handleStateChangeError);
  }

  function handleStateChangeError(event, toState, toParams, fromState, fromParams, error) {
    event.preventDefault();
    var errorState = (404 === error.status) ? "404" : "error";
    $state.go(errorState);
  }
}

module.exports = BootstrapService;
