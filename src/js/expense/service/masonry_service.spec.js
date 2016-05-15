"use strict";

var sinon = require("sinon");

describe("The masonry service", function () {
  var $rootScope, service;

  beforeEach(function () {
    $rootScope = {
      $broadcast: sinon.spy()
    };
  });

  beforeEach(function () {
    var MasonryService = require("./masonry_service");
    service = new MasonryService($rootScope);
  });

  it("should be defined", function () {
    service.should.be.defined;
  });

  it("should broadcast a reload event", function () {
    service.reloadBricks();
    $rootScope.$broadcast.should.have.been.calledWith("masonry.reload");
  });
});