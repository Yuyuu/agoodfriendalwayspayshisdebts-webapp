"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The service responsible for wrapping a modal in a promise", function () {
  var deferred, result, $rootScope, $q, $modal, service;

  beforeEach(function () {
    var promise = {then: function (callback) {callback.call(null, result);}};

    deferred = {promise: promise, resolve: sinon.spy()};
    $rootScope = {$new: sinon.stub().withArgs(true).returns({})};
    $q = {defer: sinon.stub().returns(deferred)};
    $modal = sinon.stub().returns({hide: sinon.spy()});
  });

  beforeEach(function () {
    var ModalService = require("./modal_service");
    service = new ModalService($rootScope, $q, $modal);
  });

  it("should be defined", function () {
    expect(service).to.be.defined;
  });

  it("should wrap the modal instance in a promise", function () {
    result = "hello";

    var modalInstance = service.open({});

    modalInstance.result.then(function (modalResult) {
      expect(modalResult).to.equal("hello");
    });
  });

  it("should resolve the promise when the modal is closed", function () {
    var options = {};
    service.open(options);

    options.scope.close();

    expect(deferred.resolve).to.have.been.called;
  });

  it("should populate the modal scope with data if any is provided", function () {
    var options = {data: {hi: "hello"}};

    service.open(options);

    expect(options.scope.hi).to.equal("hello");
  });
});