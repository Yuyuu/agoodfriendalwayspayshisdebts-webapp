'use strict';

import ActivityController from './activity_controller';
let expect = require('chai').use(require('sinon-chai')).expect;
let sinon = require('sinon');

describe('The activity controller', () => {
  let $stateParams, Activity, controller;

  beforeEach(() => {
    $stateParams = {id: '123'};
    Activity = {get: sinon.stub()};
  });

  beforeEach(() => {
    Activity.get.withArgs('123').returns({
      then: callback => {callback([{id: '456'}, {id: '789'}]); return {'finally': callback => callback()};}
    });
  });

  beforeEach(() => {
    controller = new ActivityController($stateParams, Activity);
  });

  it('should be defined', () => {
    expect(controller).to.be.defined;
  });

  it('should load the activity of the event upon activation', () => {
    expect(controller.operations).to.have.length(2);
    expect(controller.operations[0].id).to.equal('456');
    expect(controller.operations[1].id).to.equal('789');
    expect(controller.loading).to.be.false;
  });

  it('should fetch the next page when loading more activity', () => {
    controller.loadMore();
    expect(Activity.get).to.have.been.calledWith('123', 2);
    expect(controller.operations[2].id).to.equal('456');
    expect(controller.operations[3].id).to.equal('789');
    expect(controller.loading).to.be.false;
  });
});
