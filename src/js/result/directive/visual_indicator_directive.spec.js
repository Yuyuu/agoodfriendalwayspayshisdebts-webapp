"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The directive responsible for adding a visual indication on the result tables rows", function () {
  var scope, element, directive;

  beforeEach(function () {
    scope = {debtAmount: 0};
    element = {addClass: sinon.spy()};
  });

  beforeEach(function () {
    var VisualIndicatorDirective = require("./visual_indicator_directive");
    directive = new VisualIndicatorDirective();
  });

  it("should be defined", function () {
    expect(directive).to.be.defined;
  });

  it("should add the danger class to the row if the debt amount is superior to 0.005", function () {
    scope.debtAmount = 5;
    directive.link(scope, element);
    expect(element.addClass).to.have.been.calledWith("danger");
  });

  it("should add the danger class to the row if the debt amount is equal to 0.005", function () {
    scope.debtAmount = 0.005;
    directive.link(scope, element);
    expect(element.addClass).to.have.been.calledWith("danger");
  });

  it("should add the success class to the row if the debt amount is inferior to 0.005", function () {
    directive.link(scope, element);
    expect(element.addClass).to.have.been.calledWith("success");
  });
});