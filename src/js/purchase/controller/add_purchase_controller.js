"use strict";

var _ = require("underscore");

/* @ngInject */
function AddPurchaseController(Purchases, Notifications) {
  var it = this;
  this.purchase = {
    label: undefined,
    purchaserId: undefined,
    amount: undefined,
    participantsIds: [],
    description: undefined
  };

  this.addPurchase = addPurchase;

  function addPurchase(event, purchase) {
    delete it.errors;
    var purchasePassedToResource = _.extend({eventId: event.id}, purchase);
    Purchases.add(
      purchasePassedToResource,
      function (addedPurchase) {
        clearForm();
        event.purchases.push(addedPurchase);
        Notifications.success("PURCHASE_ADDED_SUCCESS");
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
    it.purchase.purchaserId = undefined;
    it.purchase.amount = undefined;
    it.purchase.participantsIds = [];
    it.purchase.description = undefined;
  }

  function extractMessagesFromError(error) {
    it.errors = (error.status === 400) ? error.data.errors : [{message: "ADD_PURCHASE_DEFAULT_ERROR"}];
  }
}

module.exports = AddPurchaseController;