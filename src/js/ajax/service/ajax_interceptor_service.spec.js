"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The ajax interceptor", function () {
  var $rootScope, $q, AppEvents, interceptor;

  beforeEach(function () {
    $rootScope = {$broadcast: sinon.spy()};
    $q = {};
    AppEvents = require("../../internal/events");
  });

  beforeEach(function () {
    var AjaxInterceptorService = require("./ajax_interceptor_service");
    interceptor = new AjaxInterceptorService($rootScope, $q, AppEvents);
  });

  it("should emit the request started event when a request is intercepted", function () {
    interceptor.request({});

    expect($rootScope.$broadcast).to.have.been.calledWith(AppEvents.HTTP.REQUEST_STARTED);
  });

  it("should emit the request ended event when a response is intercepted", function () {
    interceptor.response({});

    expect($rootScope.$broadcast).to.have.been.calledWith(AppEvents.HTTP.REQUEST_ENDED);
  });

  it("should emit the request ended event when a request failed", function () {
    interceptor.response({});

    expect($rootScope.$broadcast).to.have.been.calledWith(AppEvents.HTTP.REQUEST_ENDED);
  });
});