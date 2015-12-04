"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The directive responsible for adding a visual indication on the result tables rows", function () {
  var scope, element, directive;

  beforeEach(function () {
    scope = {row: {mitigatedDebt: 0, advance: 0}};
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
    scope.row.mitigatedDebt = 5;
    directive.link(scope, element);
    expect(element.addClass).to.have.been.calledWith("danger");
  });

  it("should add the danger class to the row if the debt amount is equal to 0.005", function () {
    scope.row.mitigatedDebt = 0.005;
    directive.link(scope, element);
    expect(element.addClass).to.have.been.calledWith("danger");
  });

  it("should add the warning class to the row if the advance amount is superior to 0.005", function () {
    scope.row.advance = 5;
    directive.link(scope, element);
    expect(element.addClass).to.have.been.calledWith("warning");
  });

  it("should add the danger class to the row if the debt amount is equal to 0.005", function () {
    scope.row.advance = 0.005;
    directive.link(scope, element);
    expect(element.addClass).to.have.been.calledWith("warning");
  });

  it("should not add any class if there is no debt or advance", function () {
    directive.link(scope, element);
    expect(element.addClass).to.not.have.been.called;
  });
});