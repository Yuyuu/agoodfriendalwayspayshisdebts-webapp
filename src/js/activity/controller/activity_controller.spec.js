"use strict";

var sinon = require("sinon");

describe("The activity controller", function () {
  var $stateParams, Activity, controller;

  beforeEach(function () {
    $stateParams = {id: "123"};
    Activity = {get: sinon.stub(), next: sinon.stub(), hasNext: sinon.stub()};
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
    Activity.next
      .resolves([{id: "135"}]);

    var loadMorePromise = controller.loadMore();

    loadMorePromise.then(function () {
      controller.operations.should.have.length(3);
      controller.operations[2].id.should.equal("135");
      controller.loading.should.be.false;
    });
  });

  it("should be aware if all operations have been loaded", function () {
    Activity.hasNext.returns(true);
    controller.allLoaded.should.be.false;
    Activity.hasNext.returns(false);
    controller.allLoaded.should.be.true;
  });
});