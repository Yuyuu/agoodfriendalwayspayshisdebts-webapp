"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("The controller responsible for showing an event details", function () {
  var $stateParams, Events, event, controller;

  beforeEach(function () {
    $stateParams = {id: "12345"};
    event = {participants: [{id: "123", name: "Kim"}, {id: "456", name: "Bob"}, {id: "789", name: "Ben"}]};
    Events = {
      get: function () {return {then: function (callback) {callback.call(null, event);}};}
    };
  });

  beforeEach(function () {
    var ShowEventController = require("./show_event_controller");
    controller = new ShowEventController($stateParams, Events);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should load the event details on activation", function () {
    expect(controller.event).to.deep.equal(event);
  });
});