'use strict';

import ExpenseService from './expense_service';
let expect = require('chai').use(require('sinon-chai')).expect;
let sinon = require('sinon');

describe('The expense service', () => {
  let Expenses, service;

  beforeEach(() => {
    Expenses = expensesResourceStub();
  });

  beforeEach(() => {
    service = new ExpenseService(Expenses);
  });

  it('should be defined', () => {
    expect(service).to.be.defined;
  });

  it('should increment the skip value when an expense is created', () => {
    service.addExpense({});

    expect(service.skip).to.equal(1);
  });

  it('should increment the expense count when an expense is created', () => {
    service.addExpense({});

    expect(service.expenseCount).to.equal(1);
  });

  it('should update the list of expenses when an expense is created', () => {
    service.addExpense({id: '123'});

    expect(service.expenses).to.have.length(1);
    expect(service.expenses[0].id).to.equal('123');
  });

  it('should decrement the skip value when an expense is deleted', () => {
    service.deleteExpense({});

    expect(service.skip).to.equal(-1);
  });

  it('should decrement the expense count when an expense is deleted', () => {
    service.deleteExpense({});

    expect(service.expenseCount).to.equal(-1);
  });

  it('should update the list of expenses when an expense is deleted', () => {
    let expense = {id: '123'};
    service.expenses.push(expense);

    service.deleteExpense(expense);

    expect(service.expenses).to.have.length(0);
  });

  it('should reset the skip value on initialization', () => {
    service.skip = 3;

    service.initializeForEvent('eventId');

    expect(service.skip).to.equal(0);
  });

  it('should initialize the list with the received expenses', () => {
    service.initializeForEvent('eventId');

    expect(service.expenseCount).to.equal(2);
    expect(service.expenses).to.have.length(1);
    expect(service.expenses[0].id).to.equal('123');
  });

  it('should fetch a different batch every time', () => {
    service.loadMoreFrom('eventId');

    expect(service.skip).to.equal(4);
  });

  it('should store the expenses in ascendant order', () => {
    Expenses.fetch.returns({then: callback => callback([{id: '456'}, {id: '789'}])});
    service.expenses.push({id: '123'});

    service.loadMoreFrom('eventId');

    expect(service.expenses[0].id).to.equal('456');
    expect(service.expenses[1].id).to.equal('789');
    expect(service.expenses[2].id).to.equal('123');
  });

  it('should be aware when all the expenses have been loaded', () => {
    service.expenseCount = 2;
    service.expenses.push({});

    service.expenses.push({});

    expect(service.allLoaded).to.be.true;
  });
});

function expensesResourceStub() {
  let resource = {add: sinon.stub(), delete: sinon.stub(), fetch: sinon.stub(), fetchWithCount: sinon.stub()};
  resource.add.returns({then: callback => callback({})});
  resource.add.withArgs({id: '123'}).returns({then: callback => callback({id: '123'})});
  resource.delete.returns({then: callback => callback()});
  resource.fetchWithCount.returns({then: callback => callback({expenseCount: 2, expenses: [{id: '123'}]})});
  resource.fetch.returns({then: callback => callback([{id: '456'}])});
  return resource;
}
