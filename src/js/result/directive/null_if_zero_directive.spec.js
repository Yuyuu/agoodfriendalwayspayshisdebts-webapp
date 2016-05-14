"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("The null if zero directive", function () {
  var scope, attributes, directive;

  beforeEach(function () {
    scope = {row: {prop: 0}};
    attributes = {debtsNullIfZero: "prop"};
  });

  beforeEach(function () {
    var NullIfZeroDirective = require("./null_if_zero_directive");
    directive = new NullIfZeroDirective();
  });

  it("should be defined", function () {
    directive.should.be.defined;
  });

  it("should set the property on the scope and keep its value if it is not zero", function () {
    scope.row.prop = 5;
    directive.link(scope, null, attributes);

    scope.prop.should.equal(5);
  });

  it("should set the property on the scope and set its value to null if it is zero", function () {
    scope.row.prop = 0;
    directive.link(scope, null, attributes);

    expect(scope.prop).to.be.null;
  });
});