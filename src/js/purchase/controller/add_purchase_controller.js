"use strict";

/* @ngInject */
function AddPurchaseController(Purchases) {
  var it = this;

  this.addPurchase = addPurchase;

  function addPurchase(event, purchase) {
    delete it.errors;
    purchase.eventId = event.id;
    Purchases.add(
      purchase,
      function (addedPurchase) {
        event.purchases.push(addedPurchase);
      },
      extractMessagesFromError
    );
  }

  function extractMessagesFromError(error) {
    it.errors = (error.status === 400) ? error.data.errors : [{message: "ADD_PURCHASE_DEFAULT_ERROR"}];
  }
}

module.exports = AddPurchaseController;