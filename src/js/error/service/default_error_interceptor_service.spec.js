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

  it("should redirect to the error page", function () {
    var rejection = {status: 500};
    interceptor.responseError(rejection);

    expect($location.path).to.have.been.calledWith("/error");
    expect($q.reject).to.have.been.calledWith(rejection);
  });
});