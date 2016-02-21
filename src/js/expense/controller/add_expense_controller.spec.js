'use strict';

import AddExpenseController from './add_expense_controller';
let expect = require('chai').use(require('sinon-chai')).expect;
let sinon = require('sinon');

describe('The controller to add expenses', () => {
  let $stateParams, expenseService, notificationService, controller;

  beforeEach(() => {
    $stateParams = {id: '123'};
    expenseService = {
      expenses: [],
      addExpense: sinon.stub().withArgs({eventId: 'eventId', id: '123'}).returns({then: callback => {
        callback();
        return {catch: sinon.spy()};
      }})};
    notificationService = {success: sinon.spy()};
  });

  beforeEach(() => {
    controller = new AddExpenseController($stateParams, expenseService, notificationService);
    controller.form = {$setPristine: sinon.spy(), $setUntouched: sinon.spy()};
  });

  it('should be defined', () => {
    expect(controller).to.be.defined;
  });

  it('should clear the form if the expense was successfully added', () => {
    controller.expense = {
      label: 'lab',
      purchaserUuid: 'pur',
      amount: 1,
      participantsUuids: ['par'],
      description: 'desc'
    };

    controller.addExpense({id: '123'});

    expect(controller.form.$setPristine).to.have.been.called;
    expect(controller.form.$setUntouched).to.have.been.called;
    expect(controller.expense.label).to.be.undefined;
    expect(controller.expense.purchaserUuid).to.be.undefined;
    expect(controller.expense.amount).to.be.undefined;
    expect(controller.expense.participantsUuids).to.have.length(0);
    expect(controller.expense.description).to.be.undefined;
  });

  it('should emit a notification if the expense was successfully added', () => {
    controller.addExpense({id: '123'});

    expect(notificationService.success).to.have.been.calledWith('EXPENSE_ADDED_SUCCESS');
  });

  it('should communicate the errors to the view if the expense could not be added', () => {
    expenseService.addExpense.returns({
      then: () => ({catch: callback => callback([{message: 'a message'}])})
    });

    controller.addExpense({id: '123'});

    expect(controller.errors).to.deep.equal([{message: 'a message'}]);
  });
});
