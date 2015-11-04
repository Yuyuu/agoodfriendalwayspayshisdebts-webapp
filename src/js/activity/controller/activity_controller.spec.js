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
      then: function (callback) {return callback([{id: "456"}, {id: "789"}]);}
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
  });
});