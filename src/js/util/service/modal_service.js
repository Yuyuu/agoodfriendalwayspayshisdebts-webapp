"use strict";

var _ = require("underscore");

/* @ngInject */
function ModalService($rootScope, $q, $modal) {
  this.open = open;

  var deferred;
  var modalInstance;

  function open(options) {
    options.scope = createScope();
    if (options.data) {
      _.each(options.data, function (value, key) {
        options.scope[key] = value;
      });
    }
    deferred = $q.defer();
    modalInstance = $modal(options);
    return {
      result: deferred.promise
    };
  }

  function createScope() {
    var scope = $rootScope.$new(true);
    scope.close = function (result) {
      deferred.resolve(result);
      modalInstance.hide();
    };
    return scope;
  }
}

module.exports = ModalService;
