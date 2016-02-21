'use strict';

import NotificationService from './notification_service';
let expect = require('chai').use(require('sinon-chai')).expect;
let sinon = require('sinon');

describe('The notification service', () => {
  let Notification, service;

  beforeEach(() => {
    Notification = {success: sinon.spy(), error: sinon.spy()};
  });

  beforeEach(() => {
    service = new NotificationService(Notification);
  });

  it('should be defined', () => {
    expect(service).to.be.defined;
  });

  it('should display a well formed success notification', () => {
    service.success('HELLO');

    expect(Notification.success).to.have.been.calledWith(sinon.match.has('title', 'HELLO'));
    expect(Notification.success).to.have.been.calledWith(sinon.match.has('message', 'HELLO'));
  });

  it('should display a well formed error notification', () => {
    service.error('ARF');

    expect(Notification.error).to.have.been.calledWith(sinon.match.has('title', 'ARF'));
    expect(Notification.error).to.have.been.calledWith(sinon.match.has('message', 'ARF'));
  });
});
