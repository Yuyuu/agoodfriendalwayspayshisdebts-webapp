"use strict";

var _ = require("underscore");

/* @ngInject */
function AddPurchaseController(Purchases, $alert) {
  var it = this;
  this.purchase = {
    label: undefined,
    purchaser: undefined,
    amount: undefined,
    participants: [],
    description: undefined
  };

  this.addPurchase = addPurchase;

  var alertOptions = {
    templateUrl: "/templates/alert/strap_alert",
    type: "success",
    placement: "top-right",
    duration: 5,
    container: "body",
    dismissable: false,
    title:"PURCHASE_ADDED_SUCCESS.title",
    content: "PURCHASE_ADDED_SUCCESS.content",
    show: true
  };

  function addPurchase(event, purchase) {
    delete it.errors;
    var purchasePassedToResource = _.extend({}, purchase);
    purchasePassedToResource.eventId = event.id;
    Purchases.add(
      purchasePassedToResource,
      function (addedPurchase) {
        clearForm();
        event.purchases.push(addedPurchase);
        $alert(alertOptions);
      },
      extractMessagesFromError
    );
  }

  function clearForm() {
    if (it.form) {
      it.form.$setPristine();
      it.form.$setUntouched();
    }
    it.purchase.label = undefined;
    it.purchase.purchaser = undefined;
    it.purchase.amount = undefined;
    it.purchase.participants = [];
    it.purchase.description = undefined;
  }

  function extractMessagesFromError(error) {
    it.errors = (error.status === 400) ? error.data.errors : [{message: "ADD_PURCHASE_DEFAULT_ERROR"}];
  }
}

module.exports = AddPurchaseController;