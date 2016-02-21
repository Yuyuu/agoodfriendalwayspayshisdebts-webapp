'use strict';

import HistoryController from './history_controller';
let expect = require('chai').use(require('sinon-chai')).expect;
let sinon = require('sinon');

describe('The history controller', () => {
  let $stateParams, Activity, controller;

  beforeEach(() => {
    $stateParams = {id: '123'};
    Activity = {getWithFilter: sinon.stub()};
  });

  beforeEach(() => {
    Activity.getWithFilter.withArgs('123').returns({
      then: callback => {
        callback([{id: '456'}, {id: '789'}, {id: '444'}]);
        return {
          then: callback => {
            callback([{id: '456'}, {id: '789'}, {id: '444'}]);
            return {'finally': callback => callback()};
          }
        };
      }
    });
  });

  beforeEach(() => {
    controller = new HistoryController($stateParams, Activity);
  });

  it('should be defined', () => {
    expect(controller).to.be.defined;
  });

  it('should load the history upon activation', () => {
    expect(controller.summaries).to.have.length(3);
    expect(controller.summaries[0].id).to.equal('456');
    expect(controller.summaries[1].id).to.equal('789');
    expect(controller.summaries[2].id).to.equal('444');
    expect(controller.loading).to.be.false;
  });

  it('should fetch the next page when loading more history', () => {
    controller.loadMore();
    expect(Activity.getWithFilter).to.have.been.calledWith('123', 2, 'reminders');
    expect(controller.summaries[3].id).to.equal('456');
    expect(controller.summaries[4].id).to.equal('789');
    expect(controller.summaries[5].id).to.equal('444');
    expect(controller.loading).to.be.false;
  });

  it('should not be able to load more when all history has been loaded', () => {
    let result = [{id: '635'}];
    Activity.getWithFilter.withArgs('123').returns({
      then: cb => {
        cb(result);
        return {then: callback => {callback(result); return {'finally': callback => callback()};}};
      }
    });

    controller.loadMore();
    expect(controller.allLoaded).to.be.true;
  });

  it('should reset the history when a change is done', () => {
    let result = [{id: '635'}];
    Activity.getWithFilter.withArgs('123').returns({
      then: cb => {
        cb(result);
        return {then: callback => {callback(result); return {'finally': callback => callback()};}};
      }
    });

    expect(controller.summaries).to.have.length(3);
    controller.filter = 'expenses';
    controller.refresh();
    expect(Activity.getWithFilter).to.have.been.calledWith('123', 1, 'expenses');
    expect(controller.summaries).to.have.length(1);
    expect(controller.summaries[0].id).to.equal('635');
  });

  it('should always know if all the history has been loaded', () => {
    let result = [{id: '635'}];
    Activity.getWithFilter.withArgs('123').returns({
      then: cb => {
        cb(result);
        return {then: callback => {callback(result); return {'finally': callback => callback()};}};
      }
    });

    expect(controller.allLoaded).to.be.false;
    controller.filter = 'expenses';
    controller.refresh();
    expect(controller.allLoaded).to.be.true;
    result = [{id: '635'}, {id: '152'}, {id: '888'}];
    controller.refresh();
    expect(controller.allLoaded).to.be.false;
  });
});
