"use strict";

var sinon = require("sinon");

describe("The history controller", function () {
  var $stateParams, Activity, controller;

  beforeEach(function () {
    $stateParams = {id: "123"};
    Activity = {getWithFilter: sinon.stub()};
  });

  beforeEach(function () {
    Activity.getWithFilter
      .withArgs("123")
      .resolves([{id: "456"}, {id: "789"}, {id: "444"}]);
  });

  beforeEach(function () {
    var HistoryController = require("./history_controller");
    controller = new HistoryController($stateParams, Activity);
  });

  it("should be defined", function () {
    controller.should.be.defined;
  });

  it("should load the history upon activation", function () {
    controller.activation.then(function () {
      controller.summaries.should.have.length(3);
      controller.summaries[0].id.should.equal("456");
      controller.summaries[1].id.should.equal("789");
      controller.summaries[2].id.should.equal("444");
      controller.loading.should.be.false;
    });
  });

  it("should fetch the next page when loading more history", function () {
    var loadMorePromise = controller.loadMore();

    Activity.getWithFilter.should.have.been.calledWith("123", "reminders", 2);
    loadMorePromise.then(function () {
      controller.summaries[3].id.should.equal("456");
      controller.summaries[4].id.should.equal("789");
      controller.summaries[5].id.should.equal("444");
      controller.loading.should.be.false;
    });
  });

  it("should not be able to load more when all history has been loaded", function () {
    Activity.getWithFilter
      .withArgs("123")
      .resolves([{id: "635"}]);

    var loadMorePromise = controller.loadMore();

    loadMorePromise.then(function () {
      controller.allLoaded.should.be.true;
    });
  });

  it("should reset the history when a change is done", function () {
    Activity.getWithFilter
      .withArgs("123")
      .resolves([{id: "635"}]);

    controller.activation
      .then(function () {
        controller.summaries.should.have.length(3);
        controller.filter = "expenses";
        return controller.refresh();
      })
      .then(function () {
        Activity.getWithFilter.should.have.been.calledWith("123", "expenses", 1);
        controller.summaries.should.have.length(1);
        controller.summaries[0].id.should.equal("635");
      });
  });

  it("should always know if all the history has been loaded", function () {
    Activity.getWithFilter
      .withArgs("123")
      .resolves([{id: "635"}]);

    controller.activation
      .then(function () {
        controller.allLoaded.should.be.false;
        return controller.refresh();
      })
      .then(function () {
        controller.allLoaded.should.be.true;
        Activity.getWithFilter
          .withArgs("123")
          .resolves([{id: "635"}, {id: "152"}, {id: "888"}]);
        return controller.refresh();
      })
      .then(function () {
        controller.allLoaded.should.be.false;
      });
  });
});