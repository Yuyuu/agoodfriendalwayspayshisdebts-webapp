"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The error 404 interceptor", function () {
  var $q, $location, interceptor;

  beforeEach(function () {
    $q = {reject: sinon.spy()};
    $location = {path: sinon.spy()};
    var Error404InterceptorService = require("./error_404_interceptor_service");
    interceptor = new Error404InterceptorService($q, $location);
  });

  it("should be defined", function () {
    expect(interceptor).to.be.defined;
  });

  it("should redirect to page 404 when a 404 error occurs", function () {
    var rejection = {status: 404};
    interceptor.responseError(rejection);

    expect($location.path).to.have.been.calledWith("/404");
    expect($q.reject).to.have.been.calledWith(rejection);
  });

  it("should not redirect to page 404 when an error is not a 404", function () {
    var rejection = {status: 401};
    interceptor.responseError(rejection);

    expect($location.path).to.not.have.been.called;
  });
});