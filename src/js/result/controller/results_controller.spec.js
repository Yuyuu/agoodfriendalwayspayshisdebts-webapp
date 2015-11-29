"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

var FakePromise = require("../../../test/fake_promise");

describe("The results controller", function () {
  var $stateParams, Results, controller;

  beforeEach(function () {
    $stateParams = {id: "123"};
    Results = {get: sinon.stub()};
    Results.get.withArgs("123").returns(new FakePromise("then", "hello", [new FakePromise("finally")]));
  });

  beforeEach(function () {
    var ResultDetailsController = require("./results_controller");
    controller = new ResultDetailsController($stateParams, Results);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should load the result data on activation", function () {
    expect(controller.results).to.equal("hello");
  });
});