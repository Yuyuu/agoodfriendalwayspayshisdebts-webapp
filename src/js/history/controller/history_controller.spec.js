"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The history controller", function () {
  var $stateParams, History, controller;

  beforeEach(function () {
    $stateParams = {id: "123"};
    History = {get: sinon.stub()};
  });

  beforeEach(function () {
    History.get.withArgs("123").returns({
      then: function (callback) {callback([{id: "456"}, {id: "789"}]); return {"finally": function (callback) {callback();}};}
    });
  });

  beforeEach(function () {
    var HistoryController = require("./history_controller");
    controller = new HistoryController($stateParams, History);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should load the history upon activation", function () {
    expect(controller.summaries).to.have.length(2);
    expect(controller.summaries[0].id).to.equal("456");
    expect(controller.summaries[1].id).to.equal("789");
    expect(controller.loading).to.be.false;
  });

  it("should fetch the next page when loading more history", function () {
    controller.loadMore();
    expect(History.get).to.have.been.calledWith("123", "reminders", 2);
    expect(controller.summaries[2].id).to.equal("456");
    expect(controller.summaries[3].id).to.equal("789");
    expect(controller.loading).to.be.false;
  });

  it("should not be able to load more when all history has been loaded", function () {
    History.get.withArgs("123").returns({
      then: function (callback) {callback([{id: "635"}]); return {"finally": function (callback) {callback();}};}
    });

    controller.loadMore();
    expect(controller.allLoaded).to.be.true;
  });

  it("should reset the history when a change is done", function () {
    History.get.withArgs("123").returns({
      then: function (callback) {callback([{id: "635"}]); return {"finally": function (callback) {callback();}};}
    });

    expect(controller.summaries).to.have.length(2);
    controller.type = "expenses";
    controller.change();
    expect(History.get).to.have.been.calledWith("123", "expenses", 1);
    expect(controller.summaries).to.have.length(1);
    expect(controller.summaries[0].id).to.equal("635");
  });
});