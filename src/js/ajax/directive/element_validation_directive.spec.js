"use strict";

var proxyquire = require("proxyquire");

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The element validation directive", function () {
  var angularModule, scope, element, attributes, directive;

  beforeEach(function () {
    angularModule = {element: sinon.stub(), "@noCallThru": true};
  });

  beforeEach(function () {
    scope = {
      watchers: {},
      $watch: function (expression, callback) {scope.watchers[expression] = callback;},
      change: function (valueToChange, newValue) {
        var oldValue = scope[valueToChange];
        scope[valueToChange] = newValue;
        scope.watchers[valueToChange].call(null, newValue, oldValue);
      }
    };
    element = {};
    attributes = {elementValidation: "elm"};
  });

  beforeEach(function () {
    var ElementValidationDirective = proxyquire("./element_validation_directive", {"angular": angularModule});
    directive = new ElementValidationDirective();
  });

  it("should be defined", function () {
    expect(directive).to.be.defined;
  });

  it("should add the has-error class to the element if it is dirty and invalid", function () {
    var domElement = {addClass: sinon.stub()};
    angularModule.element.withArgs(element).returns(domElement);
    directive.link(scope, element, attributes);

    scope.change("elm.$invalid && elm.$dirty", true);

    expect(domElement.addClass).to.have.been.calledWith("has-error");
  });

  it("should remove the has-error class to the element if it is dirty and valid", function () {
    var domElement = {removeClass: sinon.stub()};
    angularModule.element.withArgs(element).returns(domElement);
    directive.link(scope, element, attributes);

    scope.change("elm.$valid && elm.$dirty", true);

    expect(domElement.removeClass).to.have.been.calledWith("has-error");
  });
});