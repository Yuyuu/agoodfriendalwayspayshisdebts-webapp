"use strict";

var angular = require("angular");

var purchaseModule = angular.module("purchase", [require("../notification")]);

purchaseModule
  .factory("Purchases", require("./resource/purchases_resource"))
  .controller("AddPurchaseController", require("./controller/add_purchase_controller"));

module.exports = purchaseModule.name;