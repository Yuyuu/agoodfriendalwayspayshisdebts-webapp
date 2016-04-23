"use strict";

var Bluebird = require("bluebird");
var sinon = require("sinon");

describe("The participants controller", function () {
  var $modal, notificationService, controller;

  beforeEach(function () {
    notificationService = {success: sinon.spy()};
    $modal = {open: sinon.stub()};
  });

  beforeEach(function () {
    var ParticipantsController = require("./participants_controller");
    controller = new ParticipantsController($modal, notificationService);
  });

  it("should be defined", function () {
    controller.should.be.defined;
  });

  it("should open a modal with the participant to edit", function () {
    var participant = {id: "123"};
    $modal.open.returns({result: new Bluebird(function (resolve) {
      resolve(participant);
    })});

    controller.edit(participant);

    $modal.open.should.have.been.calledWith(sinon.match(function (options) {
      var participant = options.resolve.participant();
      return participant.id === "123";
    }));
  });

  it("should update the view and show a success notification once the participant has been updated", function () {
    var participant = {id: "123", name: "leo", email: "leo@mail.fr"};
    $modal.open.returns({result: new Bluebird(function (resolve) {
      resolve({id: "123", name: "leô", email: "leo@email.fr"});
    })});

    var promise = controller.edit(participant);

    promise.then(function () {
      participant.name.should.equal("leo");
      participant.email.should.equal("leo@email.fr");
      notificationService.success.should.have.been.calledWith("PARTICIPANT_UPDATED_SUCCESS");
    });
  });

  it("should not update the view if the participant has not been edited", function () {
    var participant = {id: "123", name: "leo", email: "leo@mail.fr"};
    $modal.open.returns({result: new Bluebird(function (resolve) {
      resolve(null);
    })});

    var promise = controller.edit(participant);

    promise.then(function () {
      participant.name.should.equal("leo");
      participant.email.should.equal("leo@mail.fr");
      notificationService.success.should.not.have.been.called;
    });
  });
});