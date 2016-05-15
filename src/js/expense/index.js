"use strict";

var angular = require("angular");
var configureModuleRouting = require("./module_routing");

var expenseModule = angular.module("app.event.expense", []);

expenseModule
  .factory("Expenses", require("./resource/expenses_resource"))
  .service("expenseService", require("./service/expense_service"))
  .service("masonryService", require("./service/masonry_service"))
  .controller("AddExpenseController", require("./controller/add_expense_controller"))
  .controller("ExpensesListController", require("./controller/expenses_list_controller"))
  .controller("ExpenseBrickController", require("./controller/expense_brick_controller"))
  .controller("DeleteExpenseController", require("./controller/delete_expense_controller"))
  .directive("debtsExpenseBrick", require("./directive/expense_brick_directive"));

configureModuleRouting();

module.exports = expenseModule.name;