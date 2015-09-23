"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

var watcherDecorator = require("../../../test/watcher_decorator");

describe("The directive to validate elements", function () {
  var scope, element, attributes, directive;

  beforeEach(function () {
    scope = watcherDecorator.decorate({});
    element = {addClass: sinon.spy(), removeClass: sinon.spy()};
    attributes = {elementValidation: "elm"};
  });

  beforeEach(function () {
    var ElementValidationDirective = require("./element_validation_directive");
    directive = new ElementValidationDirective();
  });

  it("should be defined", function () {
    expect(directive).to.be.defined;
  });

  it("should add the has-error class to the element if it is dirty and invalid", function () {
    directive.link(scope, element, attributes);

    scope.change("elm.$invalid && elm.$dirty", true);

    expect(element.addClass).to.have.been.calledWith("has-error");
  });

  it("should remove the has-error class from the element if it is dirty and valid", function () {
    directive.link(scope, element, attributes);

    scope.change("elm.$valid && elm.$dirty", true);

    expect(element.removeClass).to.have.been.calledWith("has-error");
  });
});