"use strict";

var sinon = require("sinon");

describe("The results controller", function () {
  var $stateParams, Results, controller;

  beforeEach(function () {
    $stateParams = {id: "123"};
    Results = {get: sinon.stub()};
    Results.get
      .withArgs("123")
      .resolves("hello");
  });

  beforeEach(function () {
    var ResultDetailsController = require("./results_controller");
    controller = new ResultDetailsController($stateParams, Results);
  });

  it("should be defined", function () {
    controller.should.be.defined;
  });

  it("should load the result data on activation", function () {
    controller.activation.then(function () {
      controller.results.should.equal("hello");
    });
  });
});