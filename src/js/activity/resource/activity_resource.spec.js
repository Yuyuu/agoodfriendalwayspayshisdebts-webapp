'use strict';

import ActivityResource from './activity_resource';
let expect = require('chai').use(require('sinon-chai')).expect;
let sinon = require('sinon');

describe('The activity resource', () => {
  let $http, resource;

  beforeEach(() => {
    $http = {get: sinon.stub()};
  });

  beforeEach(() => {
    resource = new ActivityResource($http);
  });

  it('should be defined', () => {
    expect(resource).to.be.defined;
  });

  it('should retrieve the activity of an event', () => {
    $http.get.withArgs('/api/events/123/activity?filter=all&page=1').returns({
      then: callback => callback({data: [{id: '456'}]})
    });

    let operations = resource.get('123', 1);

    expect(operations[0].id).to.equal('456');
  });

  it('should retrieve the activity with a filter', () => {
    $http.get.withArgs('/api/events/123/activity?filter=reminders&page=1').returns({
      then: callback => callback({data: [{id: '456'}]})
    });

    let operations = resource.getWithFilter('123', 1, 'reminders');

    expect(operations[0].id).to.equal('456');
  });
});
