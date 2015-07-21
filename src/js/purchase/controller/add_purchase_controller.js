"use strict";

var _ = require("underscore");

/* @ngInject */
function AddPurchaseController(Purchases, $alert) {
  var it = this;

  this.addPurchase = addPurchase;

  function addPurchase(event, purchase) {
    delete it.errors;
    var purchasePassedToResource = _.extend({}, purchase);
    purchasePassedToResource.eventId = event.id;
    Purchases.add(
      purchasePassedToResource,
      function (addedPurchase) {
        event.purchases.push(addedPurchase);
        $alert({
          templateUrl: "/templates/alert/strap_alert",
          type: "success",
          placement: "top-right",
          duration: 5,
          container: "body",
          dismissable: false,
          title:"PURCHASE_ADDED_SUCCESS.title",
          content: "PURCHASE_ADDED_SUCCESS.content",
          show: true
        });
      },
      extractMessagesFromError
    );
  }

  function extractMessagesFromError(error) {
    it.errors = (error.status === 400) ? error.data.errors : [{message: "ADD_PURCHASE_DEFAULT_ERROR"}];
  }
}

module.exports = AddPurchaseController;