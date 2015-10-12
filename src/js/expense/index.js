"use strict";

var angular = require("angular");
var configureModuleRouting = require("./module_routing");

var ngStrapSelectModule = require("angular-strap") + ".select";

var expenseModule = angular.module("app.event.expense", [require("../notification"), ngStrapSelectModule]);

expenseModule
  .factory("Expenses", require("./resource/expenses_resource"))
  .service("expenseService", require("./service/expense_service"))
  .controller("AddExpenseController", require("./controller/add_expense_controller"))
  .controller("ExpensesListController", require("./controller/expenses_list_controller"))
  .controller("DeleteExpenseController", require("./controller/delete_expense_controller"))
  .directive("debtsCurrencySymbol", require("./directive/currency_symbol_directive"));

configureModuleRouting();

module.exports = expenseModule.name;