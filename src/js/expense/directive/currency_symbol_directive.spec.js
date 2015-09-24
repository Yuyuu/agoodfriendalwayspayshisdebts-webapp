"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The currency symbol directive", function () {
  var element, $locale, directive;

  beforeEach(function () {
    element = {html: sinon.spy()};
  });

  beforeEach(function () {
    $locale = {NUMBER_FORMATS: {CURRENCY_SYM: "$"}};
  });

  beforeEach(function () {
    var CurrencySymbolDirective = require("./currency_symbol_directive");
    directive = new CurrencySymbolDirective($locale);
    directive.link(null, element);
  });

  it("should be defined", function () {
    expect(directive).to.be.defined;
  });

  it("should set the currency symbol of the current locale as the text of the element", function () {
    expect(element.html).to.have.been.calledWith("$");
  });
});