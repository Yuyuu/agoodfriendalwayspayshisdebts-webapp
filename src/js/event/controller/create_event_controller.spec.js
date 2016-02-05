'use strict';

import CreateEventController from './create_event_controller';
let expect = require('chai').use(require('sinon-chai')).expect;
let sinon = require('sinon');

describe('The controller to create events', function () {
  var Events, $state, controller;

  beforeEach(function () {
    $state = {go: sinon.spy()};
    Events = {create: sinon.stub()};
  });

  beforeEach(function () {
    controller = new CreateEventController($state, Events);
  });

  it('should be defined', function () {
    expect(controller).to.be.defined;
  });

  it('should add a participant to the list', function () {
    controller.addParticipant();

    expect(controller.event.participants).to.have.length(2);
  });

  it('should remove a participant from the list', function () {
    controller.removeParticipant(0);

    expect(controller.event.participants).to.have.length(0);
  });

  it('should create the event', function () {
    var event = {name: 'Cool event', participants: [{name: 'Kim', email: '', share: 1}]};
    Events.create.returns({then: function (callback) {callback({}); return {catch: sinon.spy()};}});

    controller.createEvent(event);

    expect(Events.create).to.have.been.called;
  });

  it('should redirect to the event page when it has been successfully created', function () {
    Events.create.returns({then: function (callback) {callback({id: '12345'}); return {catch: sinon.spy()};}});
    var event = {name: 'Cool event', participants: [{name: 'Kim', email: '', share: 1}]};

    controller.createEvent(event);

    expect($state.go).to.have.been.calledWith('event.expenses', {id: '12345'});
  });

  it('should not try to redirect to the event page if the event was not created', function () {
    Events.create.returns({then: function () {return {catch: function (callback) {callback({});}};}});
    var event = {name: 'Cool event', participants: [{name: 'Kim', email: '', share: 1}]};

    controller.createEvent(event);

    expect($state.go).to.not.have.been.called;
  });

  it('should communicate the errors to the view if the event could not be created', function () {
    Events.create.returns({
      then: function () {
        return {catch: function (callback) {return callback([{message: 'a message'}]);}};
      }
    });

    controller.createEvent({});

    expect(controller.errors).to.deep.equal([{message: 'a message'}]);
  });
});
