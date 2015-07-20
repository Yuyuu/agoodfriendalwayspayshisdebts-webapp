"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The resource for events", function () {
  var $resource, resource;

  beforeEach(function () {
    $resource = sinon.stub().returns({});
  });

  beforeEach(function () {
    var EventsResource = require("./events_resource");
    resource = new EventsResource($resource);
  });

  it("should be defined", function () {
    expect(resource).to.be.defined;
  });

  it("should create the resource", function () {
    expect($resource).to.have.been.calledWith(
      "/api/events/:id",
      {id: "@id"},
      {
        get: {method: "GET", isArray: false},
        create: {method: "POST"}
      }
    );
  });
});