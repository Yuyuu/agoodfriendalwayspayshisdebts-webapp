"use strict";

var proxyquire = require("proxyquire");

var sinon = require("sinon");

var listenerDecorator = require("../../../../test/listener_decorator");

describe("The disable on request directive", function () {
  var angularModule, AppEvents, scope, element, attributes, formController, directive;
  var formElement;

  beforeEach(function () {
    angularModule = {element: sinon.stub(), "@noCallThru": true};
  });

  beforeEach(function () {
    AppEvents = require("../../internal/events");
    scope = listenerDecorator.decorate({});
    element = {addClass: sinon.spy(), removeClass: sinon.spy(), html: sinon.stub().returns("initial")};
    attributes = {elementValidation: "elm", loadingText: "loading"};
    formController = {$name: "form", $valid: false};
  });

  beforeEach(function () {
    formElement = listenerDecorator.decorate({});
    angularModule.element.withArgs("form[name='form']").returns(formElement);
  });

  beforeEach(function () {
    var DisableOnRequestDirective = proxyquire("./disable_on_request_directive", {"angular": angularModule});
    directive = new DisableOnRequestDirective(AppEvents);
    directive.link(scope, element, attributes, formController);
  });

  it("should be defined", function () {
    directive.should.be.defined;
  });

  it("should disable the element and apply loading text on submit if the form is valid", function () {
    formController.$valid = true;

    formElement.emit("submit");

    element.addClass.should.have.been.calledWith("disabled");
    element.html.should.have.been.calledWith("loading");
  });

  it("should leave the element as is on submit if the form is not valid", function () {
    formController.$valid = false;

    formElement.emit("submit");

    element.addClass.should.not.have.been.called;
    element.html.should.not.have.been.calledWith("loading");
  });

  it("should enable the element and apply initial text once the associated request is ended", function () {
    scope.emit(AppEvents.HTTP.REQUEST_ENDED);

    element.removeClass.should.have.been.calledWith("disabled");
    element.html.should.have.been.calledWith("initial");
  });
});