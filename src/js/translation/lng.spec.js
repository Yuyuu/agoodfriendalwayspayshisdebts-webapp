"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The lng provider", function () {
  var $cookies, provider;

  beforeEach(function () {
    $cookies = {get: sinon.stub()};
  });

  beforeEach(function () {
    provider = require("./lng");
  });

  it("should be defined", function () {
    expect(provider).to.be.defined;
  });

  it("should extract the language from i18next cookie containing language and country", function () {
    $cookies.get.withArgs("i18next").returns("en-GB");
    expect(provider.$get($cookies)).to.equal("en");
  });

  it("should extract the language from i18next cookie containing language only", function () {
    $cookies.get.withArgs("i18next").returns("en");
    expect(provider.$get($cookies)).to.equal("en");
  });
});