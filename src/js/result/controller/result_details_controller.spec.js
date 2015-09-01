"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller responsible for the event result page", function () {
  var $stateParams, Results, result, controller;

  beforeEach(function () {
    $stateParams = {id: "12345"};
    result = {};
    Results = {
      get: sinon.stub().withArgs("12345").returns({then: function (callback) {callback.call(null, result);}})
    };
  });

  beforeEach(function () {
    var ResultDetailsController = require("./result_details_controller");
    controller = new ResultDetailsController($stateParams, Results);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should load the result data on activation", function () {
    expect(controller.result).to.equal(result);
  });
});