"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The directive responsible for representing an array as an inline element", function () {
  var $parse, scope, element, attributes, directive;

  beforeEach(function () {
    $parse = sinon.stub().returns(function () {return scope.object.property;});
  });

  beforeEach(function () {
    scope = {object: {property: ["hello", "hi"]}};
    element = {text: sinon.spy()};
    attributes = {debtsInlineData: "object.property"};
  });

  beforeEach(function () {
    var InlineElementDirective = require("./inline_data_directive");
    directive = new InlineElementDirective($parse);
    directive.link(scope, element, attributes);
  });

  it("should be defined", function () {
    expect(directive).to.be.defined;
  });

  it("transforms the object into an inline string", function () {
    expect(element.text).to.have.been.calledWith("hello, hi");
  });
});