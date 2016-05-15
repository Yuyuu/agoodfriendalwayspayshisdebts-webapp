"use strict";

/* @ngInject */
function MasonryService($rootScope) {
  this.reloadBricks = function () {
    $rootScope.$broadcast("masonry.reload");
  };
}

module.exports = MasonryService;
