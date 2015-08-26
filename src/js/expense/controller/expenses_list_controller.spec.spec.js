"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The controller responsible for listing the expenses of an event", function () {
  var $routeParams, Expenses, expenseService, controller;

  beforeEach(function () {
    $routeParams = {id: "1234"};
    Expenses = {fetch: sinon.stub()};
    Expenses.fetch.withArgs("1234").returns({then: function (callback) {
      return callback.call(null, [{label: "expense", amount: 3.4}]);
    }});
    expenseService = {expenses: []};
  });

  beforeEach(function () {
    var ExpensesListController = require("./expenses_list_controller");
    controller = new ExpensesListController($routeParams, Expenses, expenseService);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should load the expenses on activation", function () {
    expect(controller.expenses).to.deep.include.members([{label: "expense", amount: 3.4}]);
  });
});
