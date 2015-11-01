"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

var FakePromise = require("../../../test/fake_promise");

describe("The participants controller", function () {
  var modalService, notificationService, controller;

  beforeEach(function () {
    notificationService = {success: sinon.spy()};
    modalService = {open: sinon.stub()};
  });

  beforeEach(function () {
    var ParticipantsController = require("./participants_controller");
    controller = new ParticipantsController(modalService, notificationService);
  });

  it("should be defined", function () {
    expect(controller).to.be.defined;
  });

  it("should open a modal with the participant to edit", function () {
    var participant = {id: "123"};
    modalService.open.returns({result: new FakePromise("then", participant)});

    controller.edit(participant);

    expect(modalService.open).to.have.been.calledWith(sinon.match(function (options) {
      var participant = options.resolve.participant();
      return participant.id === "123";
    }));
  });

  it("should update the view and show a success notification once the participant has been updated", function () {
    var participant = {id: "123", name: "leo", email: "leo@mail.fr"};
    modalService.open.returns({result: new FakePromise("then", {id: "123", name: "leô", email: "leo@email.fr"})});

    controller.edit(participant);

    expect(participant.name).to.equal("leo");
    expect(participant.email).to.equal("leo@email.fr");
    expect(notificationService.success).to.have.been.calledWith("PARTICIPANT_UPDATED_SUCCESS");
  });

  it("should not update the view if the participant has not been edited", function () {
    var participant = {id: "123", name: "leo", email: "leo@mail.fr"};
    modalService.open.returns({result: new FakePromise("then", null)});

    controller.edit(participant);

    expect(participant.name).to.equal("leo");
    expect(participant.email).to.equal("leo@mail.fr");
    expect(notificationService.success).to.not.have.been.called;
  });
});