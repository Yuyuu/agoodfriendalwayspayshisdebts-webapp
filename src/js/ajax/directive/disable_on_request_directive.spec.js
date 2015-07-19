"use strict";

var proxyquire = require("proxyquire");

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

var listenerDecorator = require("../../../test/listener_decorator");

describe("The directive that disables an element while a request is pending", function () {
  var angularModule, AppEvents, scope, element, attributes, formController, directive;
  var formElement, directiveElement;

  beforeEach(function () {
    angularModule = {element: sinon.stub(), "@noCallThru": true};
  });

  beforeEach(function () {
    AppEvents = require("../../internal/events");
    scope = listenerDecorator.decorate({});
    element = {};
    attributes = {elementValidation: "elm"};
    formController = {$name: "form", $valid: false};
  });

  beforeEach(function () {
    formElement = listenerDecorator.decorate({});
    directiveElement = {addClass: sinon.spy(), removeClass: sinon.spy()};
    angularModule.element.withArgs("form[name=form]").returns(formElement);
    angularModule.element.withArgs(element).returns(directiveElement);
  });

  beforeEach(function () {
    var DisableOnRequestDirective = proxyquire("./disable_on_request_directive", {"angular": angularModule});
    directive = new DisableOnRequestDirective(AppEvents);
    directive.link(scope, element, attributes, formController);
  });

  it("should be defined", function () {
    expect(directive).to.be.defined;
  });

  it("should disable the element on submit if the form is valid", function () {
    formController.$valid = true;

    formElement.emit("submit");

    expect(directiveElement.addClass).to.have.been.calledWith("disabled");
  });

  it("should leave the element as is on submit if the form is not valid", function () {
    formController.$valid = false;

    formElement.emit("submit");

    expect(directiveElement.addClass).to.not.have.been.called;
  });

  it("should enable the element once the associated request is ended", function () {
    scope.emit(AppEvents.HTTP.REQUEST_ENDED);

    expect(directiveElement.removeClass).to.have.been.calledWith("disabled");
  });
});