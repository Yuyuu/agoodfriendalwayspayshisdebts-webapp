"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The resource responsible for the server communication about expenses", function () {
  var $http, resource;

  beforeEach(function () {
    var expense = {label: "expense", amount: 3.4};
    $http = {post: sinon.stub(), get: sinon.stub()};
    $http.post.returns({then: function (callback) {
      return callback.call(null, {status: 201, data: expense});
    }});
    $http.get.withArgs("/api/events/1234/expenses").returns({then: function (callback) {
      return callback.call(null, {status: 200, data: {expenses: [expense]}});
    }});
  });

  beforeEach(function () {
    var Expenses = require("./expenses_resource");
    resource = new Expenses($http);
  });

  it("should be defined", function () {
    expect(resource).to.be.defined;
  });

  it("should fetch all the expenses of an event while hiding the underlying http request", function () {
    var expenses = resource.fetch("1234");

    expect(expenses).to.deep.include.members([{label: "expense", amount: 3.4}]);
  });

  it("should ask the server to add an expense and return the added expense while hiding the underlying http request", function () {
    var data = {eventId: "1234"};

    var expense = resource.add(data);

    expect(expense).to.deep.equal({label: "expense", amount: 3.4});
  });
});