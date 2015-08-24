"use strict";

var angular = require("angular");

var expenseModule = angular.module("expense", [require("../notification")]);

expenseModule
  .factory("Expenses", require("./resource/expenses_resource"))
  .controller("AddExpenseController", require("./controller/add_expense_controller"));

module.exports = expenseModule.name;