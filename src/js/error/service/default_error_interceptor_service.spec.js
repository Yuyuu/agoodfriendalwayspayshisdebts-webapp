"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The default error interceptor", function () {
  var $q, $location, interceptor;

  beforeEach(function () {
    $q = {reject: sinon.spy()};
    $location = {path: sinon.spy()};
    var ErrorInterceptorService = require("./default_error_interceptor_service");
    interceptor = new ErrorInterceptorService($q, $location);
  });

  it("should be defined", function () {
    expect(interceptor).to.be.defined;
  });

  it("should redirect to the error page if a 5xx error occurs", function () {
    var rejection = {status: 500};
    interceptor.responseError(rejection);

    expect($location.path).to.have.been.calledWith("/error");
    expect($q.reject).to.have.been.calledWith(rejection);
  });

  it("should not redirect to the error page when any other error occurs", function () {
    var rejection = {status: 405};
    interceptor.responseError(rejection);

    expect($location.path).to.not.have.been.calledWith("/error");

    rejection.status = 600;
    interceptor.responseError(rejection);

    expect($location.path).to.not.have.been.calledWith("/error");
    expect($q.reject).to.have.been.calledWith(rejection);
  });
});