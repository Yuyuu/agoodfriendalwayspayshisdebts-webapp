"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller to add purchases", function () {
  var event, purchase, Purchases, $alert, controller;

  beforeEach(function () {
    event = {id: "123", purchases: []};
    purchase = {label: "Food", purchaser: "Kim", amount: 5, participants: ["Kim"], description: "Hmmm"};
    Purchases = {add: sinon.spy()};
    $alert = sinon.spy();
  });

  beforeEach(function () {
    var AddPurchaseController = require("./add_purchase_controller");
    controller = new AddPurchaseController(Purchases, $alert);
    controller.form = {$setPristine: sinon.spy(), $setUntouched: sinon.spy()};
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should pass the purchase with the event id to the resource", function () {
    controller.addPurchase(event, purchase);

    expect(Purchases.add).to.have.been.calledWith(sinon.match.has("eventId", "123"));
  });

  it("should clear the form if the purchase was successfully added", function () {
    controller.purchase = purchase;
    Purchases.add = function (data, successCb) {successCb(purchase);};

    controller.addPurchase(event, purchase);

    expect(controller.form.$setPristine).to.have.been.called;
    expect(controller.form.$setUntouched).to.have.been.called;
    expect(controller.purchase.label).to.be.undefined;
    expect(controller.purchase.purchaser).to.be.undefined;
    expect(controller.purchase.amount).to.be.undefined;
    expect(controller.purchase.participants).to.have.length(0);
    expect(controller.purchase.description).to.be.undefined;
  });

  it("should push the new purchase to the event and emit an alert if it was successfully added", function () {
    Purchases.add = function (data, successCb) {successCb(purchase);};

    controller.addPurchase(event, purchase);

    expect(event.purchases[0].label).to.equal("Food");
    expect($alert).to.have.been.called;
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