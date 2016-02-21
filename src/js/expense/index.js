'use strict';

import angular from 'angular';
import 'angular-masonry';
import ExpensesResource from './resource/expenses_resource';
import ExpenseService from './service/expense_service';
import AddExpenseController from './controller/add_expense_controller';
import ExpensesListController from './controller/expenses_list_controller';
import CurrencySymbolDirective from './directive/currency_symbol_directive';
import routing from './module_routing';

export default angular.module('app.event.expense', ['wu.masonry'])
  .config(routing)
  .service('Expenses', ExpensesResource)
  .service('expenseService', ExpenseService)
  .controller('AddExpenseController', AddExpenseController)
  .controller('ExpensesListController', ExpensesListController)
  .directive('debtsCurrencySymbol', CurrencySymbolDirective)
  .name;
