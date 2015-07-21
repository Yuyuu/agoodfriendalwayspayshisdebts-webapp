"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("The directive to validate currency input", function () {
  var modelController, directive;

  beforeEach(function () {
    modelController = {$validators: {}, $parsers: []};
  });

  beforeEach(function () {
    var CurrencyValidationDirective = require("./currency_validation_directive");
    directive = new CurrencyValidationDirective();
    directive.link(null, null, null, modelController);
  });

  it("should be defined", function () {
    expect(directive).to.be.defined;
  });

  it("should accept amounts with no decimals", function () {
    var result = modelController.$parsers[0]("18");
    expect(result).to.be.ok;
  });

  it("should accept amounts with one or two decimals", function () {
    var result = modelController.$parsers[0]("0.4");
    expect(result).to.be.ok;

    result = modelController.$parsers[0]("0.46");
    expect(result).to.be.ok;
  });

  it("should accept numbers with either dots or commas as a separator", function () {
    var result = modelController.$parsers[0]("0.5");
    expect(result).to.equal(0.5);

    result = modelController.$parsers[0]("0,5");
    expect(result).to.equal(0.5);
  });

  it("should invalidate letters", function () {
    var result = modelController.$parsers[0]("1euro");
    expect(result).to.not.be.ok;
  });

  it("should invalidate negative numbers", function () {
    var result = modelController.$parsers[0]("-10");
    expect(result).to.not.be.ok;
  });

  it("should invalidate 0", function () {
    var isValid = modelController.$validators.currency(0);
    expect(isValid).to.be.false;
  });

  it("should invalidate numbers with a separator but no decimals", function () {
    var result = modelController.$parsers[0]("0,");
    expect(result).to.not.be.ok;
  });

  it("should invalidate numbers with no digit before decimals", function () {
    var result = modelController.$parsers[0](",50");
    expect(result).to.not.be.ok;
  });

  it("should invalidate numbers with more than two decimals", function () {
    var result = modelController.$parsers[0]("0,234");
    expect(result).to.not.be.ok;
  });

  it("should invalidate numbers thousands groups separators", function () {
    var result = modelController.$parsers[0]("1 234,23");
    expect(result).to.not.be.ok;
    result = modelController.$parsers[0]("1.234,23");
    expect(result).to.not.be.ok;
  });

  it("should invalidate malformed numbers", function () {
    var isValid = modelController.$parsers[0]("0,23,34");
    expect(isValid).to.not.be.ok;
    isValid = modelController.$parsers[0]("0,23.34");
    expect(isValid).to.not.be.ok;
    isValid = modelController.$parsers[0]("0.23.34");
    expect(isValid).to.not.be.ok;
  });

  it("should parse the view value as a float into the model", function () {
    var modelValue = modelController.$parsers[0]("12.45");

    expect(modelValue).to.equal(12.45);
  });
});