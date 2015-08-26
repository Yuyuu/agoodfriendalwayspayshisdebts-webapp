"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The resource responsible for the server communication about expenses", function () {
  var $http, resource;

  beforeEach(function () {
    $http = {post: sinon.spy()};
  });

  beforeEach(function () {
    var Expenses = require("./expenses_resource");
    resource = new Expenses($http);
  });

  it("should be defined", function () {
    expect(resource).to.be.defined;
  });

  it("should send a post request to the server to add an expense", function () {
    var data = {eventId: "1234"};

    resource.add(data);

    expect($http.post).to.have.been.calledWith("/api/events/1234/expenses", data);
  });
});