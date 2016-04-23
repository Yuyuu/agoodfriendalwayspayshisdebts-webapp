"use strict";

var sinon = require("sinon");

var listenerDecorator = require("../../../../test/listener_decorator");

describe("The bootstrap service", function () {
  var $rootScope, $state, service;

  beforeEach(function () {
    $rootScope = listenerDecorator.decorate({});
    $state = {go: sinon.spy()};
  });

  beforeEach(function () {
    var BootstrapService = require("./bootstrap_service");
    service = new BootstrapService($rootScope, $state);
    service.start();
  });

  it("should be defined", function () {
    service.should.be.defined;
  });

  it("should setup the handler for the state change error", function () {
    var event = {preventDefault: sinon.spy()};
    $rootScope.emit("$stateChangeError", [event, null, null, null, null, {status: 404}]);
    $state.go.should.have.been.calledWith("404");

    $rootScope.emit("$stateChangeError", [event, null, null, null, null, {status: 500}]);
    $state.go.should.have.been.calledWith("error");
  });
});