"use strict";

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
    interceptor.should.be.defined;
  });

  it("should redirect to the error page if a 500 error occurs", function () {
    var rejection = {status: 500};
    interceptor.responseError(rejection);

    $location.path.should.have.been.calledWith("/error");
    $q.reject.should.have.been.calledWith(rejection);
  });

  it("should not redirect to the error page when any other error occurs", function () {
    var rejection = {status: 503};
    interceptor.responseError(rejection);

    $location.path.should.not.have.been.calledWith("/error");

    rejection.status = 600;
    interceptor.responseError(rejection);

    $location.path.should.not.have.been.calledWith("/error");
    $q.reject.should.have.been.calledWith(rejection);
  });
});