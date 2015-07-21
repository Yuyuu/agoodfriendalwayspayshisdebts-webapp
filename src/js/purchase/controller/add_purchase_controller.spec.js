"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller to add purchases", function () {
  var event, purchase, Purchases, controller;

  beforeEach(function () {
    event = {id: "123", purchases: []};
    purchase = {label: "Food", purchaser: "Kim", amount: 5, participants: ["Kim"], description: "Hmmm"};
    Purchases = {add: sinon.spy()};
  });

  beforeEach(function () {
    var AddPurchaseController = require("./add_purchase_controller");
    controller = new AddPurchaseController(Purchases);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should extend the purchase with the event id and add the purchase", function () {
    controller.addPurchase(event, purchase);

    expect(purchase.eventId).to.equal("123");
    expect(Purchases.add).to.have.been.called;
  });

  it("should add the new purchase to the event if it was successfully created", function () {
    Purchases.add = function (data, successCb) {successCb(purchase);};

    controller.addPurchase(event, purchase);

    expect(event.purchases[0].label).to.equal("Food");
  });

  it("should not add any to the event if it was not created", function () {
    Purchases.add = function (data, successCb, errorCb) {errorCb({data: {errors: []}});};

    controller.addPurchase(event, purchase);

    expect(event.purchases).to.have.length(0);
  });

  it("should get a reason if the purchase could not be added", function () {
    Purchases.add = function (data, successCb, errorCb) {
      errorCb({status: 400, data: {errors: [{message: "a message"}]}});
    };

    controller.addPurchase(event, purchase);

    expect(controller.errors).to.deep.equal([{message: "a message"}]);
  });

  it("should get a default reason if an unhandled error occurred while adding a purchase", function () {
    Purchases.add = function (data, successCb, errorCb) {errorCb({});};

    controller.addPurchase(event, purchase);

    expect(controller.errors).to.deep.equal([{message: "ADD_PURCHASE_DEFAULT_ERROR"}]);
  });
});