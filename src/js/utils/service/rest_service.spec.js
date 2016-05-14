"use strict";

var sinon = require("sinon");
var Promise = require("bluebird");

describe("The rest service", function () {
  var $http, service;

  beforeEach(function () {
    $http = {
      get: sinon.stub(),
      post: sinon.stub(),
      put: sinon.stub(),
      patch: sinon.stub(),
      delete: sinon.stub()
    };
  });

  beforeEach(function () {
    var RestService = require("./rest_service");
    service = new RestService($http, Promise);
  });

  it("should be defined", function () {
    service.should.to.be.defined;
  });

  it("should get a resource", function () {
    $http.get
      .withArgs("/uri/to/resource", {the: "config"})
      .resolves({data: [{hello: "world"}, {foo: "bar"}], config: {withLinkObject: false}});

    var getCall = service.get("/uri/to/resource", {the: "config"});

    getCall.then(function (objects) {
      objects.should.deep.equal([{hello: "world"}, {foo: "bar"}]);
    });
  });

  it("should get a resource with the parsed link header", function () {
    var linkHeader = "</path?key=value>; rel=\"next\", </path?page=4>; rel=\"last\"";
    $http.get
      .withArgs("/uri/to/resource", {withLinkObject: true})
      .resolves({
        data: [{hello: "world"}, {foo: "bar"}],
        config: {withLinkObject: true},
        headers: sinon.stub().withArgs("Link").returns(linkHeader)
      });

    var getCall = service.get("/uri/to/resource", {withLinkObject: true});

    getCall.then(function (response) {
      response.data.should.deep.equal([{hello: "world"}, {foo: "bar"}]);
      response.links.next.url.should.equal("/path?key=value");
      response.links.last.url.should.equal("/path?page=4");
    });
  });

  it("should reject with data", function () {
    $http.get
      .withArgs("/uri/to/resource", {})
      .rejects({data: [{message: "argh"}]});

    var getCall = service.get("/uri/to/resource");

    getCall.should.be.rejected.then(function (rejection) {
      rejection.should.deep.equal([{message: "argh"}]);
    });
  });

  it("should post to a resource", function () {
    $http.post
      .withArgs("/uri/to/resource", {the: "data"})
      .resolves({data: [{hello: "world"}, {hey: "world"}]});

    var postCall = service.post("/uri/to/resource", {the: "data"});

    postCall.then(function (objects) {
      objects.should.deep.equal([{hello: "world"}, {hey: "world"}]);
    });
  });

  it("should post to a resource", function () {
    $http.post
      .withArgs("/uri/to/resource", {the: "data"})
      .resolves({data: [{hello: "world"}, {hey: "world"}]});

    var postCall = service.post("/uri/to/resource", {the: "data"});

    postCall.then(function (objects) {
      objects.should.deep.equal([{hello: "world"}, {hey: "world"}]);
    });
  });

  it("should put a resource", function () {
    $http.put
      .withArgs("/uri/to/resource", {the: "data"})
      .resolves({data: [{hello: "world"}, {hey: "world"}]});

    var putCall = service.put("/uri/to/resource", {the: "data"});

    putCall.then(function (objects) {
      objects.should.deep.equal([{hello: "world"}, {hey: "world"}]);
    });
  });

  it("should patch a resource", function () {
    $http.patch
      .withArgs("/uri/to/resource", {the: "data"})
      .resolves({data: [{hello: "world"}, {hey: "world"}]});

    var patchCall = service.patch("/uri/to/resource", {the: "data"});

    patchCall.then(function (objects) {
      objects.should.deep.equal([{hello: "world"}, {hey: "world"}]);
    });
  });

  it("should patch a resource", function () {
    $http.delete
      .withArgs("/uri/to/resource", {the: "data"})
      .resolves({data: [{hello: "world"}, {hey: "world"}]});

    var deleteCall = service.delete("/uri/to/resource", {the: "data"});

    deleteCall.then(function (objects) {
      objects.should.deep.equal([{hello: "world"}, {hey: "world"}]);
    });
  });
});
