'use strict';

import ExpensesListController from './expenses_list_controller';
let expect = require('chai').use(require('sinon-chai')).expect;
let sinon = require('sinon');

describe('The controller responsible for listing the expenses of an event', () => {
  let confirmed, $stateParams, $modal, expenseService, notificationService, controller;

  beforeEach(() => {
    confirmed = true;
    $stateParams = {id: '1234'};
    expenseService = {
      expenses: [{label: 'obsolete'}],
      deleteExpense: sinon.stub(),
      loadMoreFrom: sinon.stub(),
      initializeForEvent: sinon.stub()
    };
    expenseService.deleteExpense.withArgs('1234', '123').returns({then: callback => callback()});
    expenseService.loadMoreFrom.withArgs('1234').returns({finally: callback => callback()});
    expenseService.initializeForEvent.withArgs('1234').returns({finally: callback => callback()});
    notificationService = {success: sinon.spy()};
    $modal = {open: sinon.stub().returns({result: {then: callback => callback(confirmed)}})};
  });

  beforeEach(() => {
    controller = new ExpensesListController($stateParams, $modal, expenseService, notificationService);
  });

  it('should be defined', () => {
    expect(controller).to.be.defined;
  });

  it('should initialize the expenses upon activation', () => {
    expect(expenseService.initializeForEvent).to.have.been.calledWith('1234');
  });

  it('should load more expenses', () => {
    controller.loadMore();

    expect(expenseService.loadMoreFrom).to.have.been.calledWith('1234');
  });

  it('should emit a notification if the expense was successfully deleted', () => {
    controller.deleteExpense({id: '123'});

    expect($modal.open).to.have.been.calledWith(sinon.match(options => {
      let expense = options.resolve.expense();
      return expense.id === '123';
    }));
    expect(notificationService.success).to.have.been.calledWith('EXPENSE_DELETED_SUCCESS');
  });

  it('should not delete the expense if the action is cancelled', () => {
    confirmed = false;

    controller.deleteExpense('eventId', {id: '123'});

    expect(notificationService.success).to.not.have.been.called;
  });
});
