"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The activity controller", function () {
  var $stateParams, Activity, controller;

  beforeEach(function () {
    $stateParams = {id: "123"};
    Activity = {get: sinon.stub()};
  });

  beforeEach(function () {
    Activity.get.withArgs("123").returns({
      then: function (callback) {callback([{id: "456"}, {id: "789"}]); return {"finally": function (callback) {callback();}};}
    });
  });

  beforeEach(function () {
    var ActivityController = require("./activity_controller");
    controller = new ActivityController($stateParams, Activity);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should load the activity of the event upon activation", function () {
    expect(controller.operations).to.have.length(2);
    expect(controller.operations[0].id).to.equal("456");
    expect(controller.operations[1].id).to.equal("789");
    expect(controller.loading).to.be.false;
  });

  it("should fetch the next page when loading more activity", function () {
    controller.loadMore();
    expect(Activity.get).to.have.been.calledWith("123", 2);
    expect(controller.operations[2].id).to.equal("456");
    expect(controller.operations[3].id).to.equal("789");
    expect(controller.loading).to.be.false;
  });
});