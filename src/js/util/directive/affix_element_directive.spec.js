"use strict";

var proxyquire = require("proxyquire");

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The directive in charge to affix elements", function () {
  var angularModule, element, $affix, $window, directive;

  beforeEach(function () {
    angularModule = {element: sinon.stub(), "@noCallThru": true};
    angularModule.element.withArgs($window).returns("window");
    angularModule.element.withArgs(".page-footer").returns({outerHeight: sinon.stub().returns(10)});
  });

  beforeEach(function () {
    element = {data: sinon.stub().withArgs("offset-top").returns("7")};
    $affix = sinon.spy();
    $window = {};
  });

  beforeEach(function () {
    var AffixElementDirective = proxyquire("./affix_element_directive", {angular: angularModule});
    directive = new AffixElementDirective($affix, $window);
  });

  it("should be defined", function () {
    expect(directive).to.be.defined;
  });

  it("should affix the element", function () {
    directive.link(null, element);

    expect($affix).to.have.been.called;
  });

  it("should retrieve the top offset from the element", function () {
    directive.link(null, element);

    expect($affix.args[0][1].offsetTop).to.equal("7");
  });

  it("should retrieve the bottom offset from footer height", function () {
    directive.link(null, element);

    expect($affix.args[0][1].offsetBottom).to.equal("10");
  });

  it("should target the window element", function () {
    directive.link(null, element);

    expect($affix.args[0][1].target).to.equal("window");
  });
});