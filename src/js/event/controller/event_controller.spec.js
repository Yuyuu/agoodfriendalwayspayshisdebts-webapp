'use strict';

import EventController from './event_controller';
let expect = require('chai').use(require('sinon-chai')).expect;
let sinon = require('sinon');

describe('The show event controller', () => {
  let $state, $modal, notificationService, event, controller;

  beforeEach(() => {
    event = {participants: [{id: '123', name: 'Kim'}, {id: '456', name: 'Bob'}, {id: '789', name: 'Ben'}]};
    $state = {params: {id: '123'}, reload: sinon.spy(), current: {name: 'state'}};
    $modal = {open: sinon.stub()};
    notificationService = {success: sinon.spy()};
  });

  beforeEach(() => {
    controller = new EventController($state, $modal, notificationService, event);
  });

  it('should be defined', () => {
    expect(controller).to.be.defined;
  });

  it('should reload the state and show a success notification when a participant is added', () => {
    $modal.open
      .withArgs({
        templateUrl: '/templates/modal/add_participant',
        controller: 'AddParticipantController',
        controllerAs: 'model'
      })
      .returns({result: {then: callback => callback({name: 'Rasheed'})}});

    controller.addParticipant();

    expect(controller.event.participants[3].name).to.equal('Rasheed');
    expect($state.reload).to.have.been.calledWith({name: 'state'});
    expect(notificationService.success).to.have.been.calledWith('PARTICIPANT_ADDED_SUCCESS');
  });
});
