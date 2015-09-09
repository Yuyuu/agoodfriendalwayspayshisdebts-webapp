"use strict";

/* @ngInject */
function ModalService($modal) {
  this.open = $modal.open;
}

module.exports = ModalService;
