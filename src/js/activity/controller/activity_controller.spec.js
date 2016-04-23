"use strict";

var sinon = require("sinon");

describe("The activity controller", function () {
  var $stateParams, Activity, controller;

  beforeEach(function () {
    $stateParams = {id: "123"};
    Activity = {get: sinon.stub()};
  });

  beforeEach(function () {
    Activity.get
      .withArgs("123")
      .resolves([{id: "456"}, {id: "789"}]);
  });

  beforeEach(function () {
    var ActivityController = require("./activity_controller");
    controller = new ActivityController($stateParams, Activity);
  });

  it("should be defined", function () {
    controller.should.be.defined;
  });

  it("should load the activity of the event upon activation", function () {
    controller.activation.then(function () {
      controller.operations.should.have.length(2);
      controller.operations[0].id.should.equal("456");
      controller.operations[1].id.should.equal("789");
      controller.loading.should.be.false;
    });
  });

  it("should fetch the next page when loading more activity", function () {
    var loadMorePromise = controller.loadMore();

    loadMorePromise.then(function () {
      Activity.get.should.have.been.calledWith("123", 2);
      controller.operations[2].id.should.equal("456");
      controller.operations[3].id.should.equal("789");
      controller.loading.should.be.false;
    });
  });
});