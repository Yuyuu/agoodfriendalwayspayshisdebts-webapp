"use strict";

var angular = require("angular");

var expenseModule = angular.module("expense", [require("../notification")]);

expenseModule
  .factory("Expenses", require("./resource/expenses_resource"))
  .service("expenseService", require("./service/expense_service"))
  .controller("AddExpenseController", require("./controller/add_expense_controller"))
  .controller("ExpensesListController", require("./controller/expenses_list_controller"));

module.exports = expenseModule.name;