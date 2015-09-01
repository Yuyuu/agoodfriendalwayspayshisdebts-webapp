"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller responsible for the event result page", function () {
  var $stateParams, Events, Results, event, results, controller;

  beforeEach(function () {
    $stateParams = {id: "12345"};
    event = {
      participants: [{id: "123", name: "Kim"}]
    };
    Events = {
      get: sinon.stub().returns({then: function (callback) {callback.call(null, event);}})
    };
    results = {};
    Results = {
      get: sinon.stub().withArgs("12345").returns({then: function (callback) {callback.call(null, results);}})
    };
  });

  beforeEach(function () {
    var ResultDetailsController = require("./result_details_controller");
    controller = new ResultDetailsController($stateParams, Events, Results);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should load the data on activation", function () {
    expect(controller.event).to.equal(event);
    expect(controller.result).to.equal(results);
  });
});