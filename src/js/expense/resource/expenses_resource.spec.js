"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The expenses resource", function () {
  var $http, $q, resource;

  beforeEach(function () {
    var expense = {label: "expense", amount: 3.4};
    $http = {post: sinon.stub(), get: sinon.stub(), delete: sinon.stub()};
    $http.get.withArgs("/api/events/1234/expenses?skip=0&limit=2").returns({then: function (callback) {
      return callback.call(null, {status: 200, data: {expenseCount: 1, expenses: [expense]}});
    }});
    $http.get.withArgs("/api/events/1234/expenses/meta").returns({then: function (callback) {
      return callback.call(null, {status: 200, data: [{id: "5678", label: "expense"}, {}]});
    }});
    $http.delete.withArgs("/api/events/1234/expenses/5678").returns({status: 204});
    $q = {reject: function (o) {return o;}};
  });

  beforeEach(function () {
    var Expenses = require("./expenses_resource");
    resource = new Expenses($http, $q);
  });

  it("should be defined", function () {
    expect(resource).to.be.defined;
  });

  describe("[fetch]", function () {
    it("should retrieve the expenses while hiding the underlying http request", function () {
      var expenses = resource.fetch("1234", 0, 2);

      expect(expenses).to.deep.include.members([{label: "expense", amount: 3.4}]);
    });
  });

  describe("[fetchWithCount]", function () {
    it("should retrieve the expenses and the count of expenses", function () {
      var data = resource.fetchWithCount("1234", 0, 2);

      expect(data.expenseCount).to.equal(1);
      expect(data.expenses[0]).to.deep.equal({label: "expense", amount: 3.4});
    });
  });

  describe("[add]", function () {
    it("should post an expense and return the added expense while hiding the underlying http request", function () {
      $http.post.withArgs("/api/events/123/expenses").returns({
        catch: function () {
          return {then: function (callback) {return callback({status: 201, data: {label: "expense", amount: 3.4}});}};
        }
      });

      var expense = resource.add("123", {});

      expect(expense).to.deep.equal({label: "expense", amount: 3.4});
    });

    it("should extract an array of messages from the response on error", function () {
      $http.post.withArgs("/api/events/123/expenses").returns({
        catch: function (callback) {
          return {then: function () {return callback({status: 400, data: {errors: []}});}};
        }
      });

      var errors = resource.add("123", {});

      expect(errors).to.be.instanceOf(Array);
    });

    it("should extract a default message if none is provided on error", function () {
      $http.post.withArgs("/api/events/123/expenses").returns({
        catch: function (callback) {
          return {then: function () {return callback({status: 500});}};
        }
      });

      var errors = resource.add("123", {});

      expect(errors[0].message).to.equal("DEFAULT");
    });
  });

  describe("[delete]", function () {
    it("should delete an expense", function () {
      var response = resource.delete("1234", "5678");

      expect(response.status).to.equal(204);
    });
  });

  describe("[metadata]", function () {
    it("should retrieve the metadata of the expenses", function () {
      var response = resource.metadata("1234");

      expect(response).to.have.length(2);
      expect(response[0]).to.deep.equal({id: "5678", label: "expense"});
    });
  });
});