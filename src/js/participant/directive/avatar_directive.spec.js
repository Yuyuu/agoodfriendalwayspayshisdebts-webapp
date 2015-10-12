"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("The avatar directive", function () {
  var scope, directive;

  beforeEach(function () {
    scope = {participant: {name: "Kim"}};
  });

  beforeEach(function () {
    var AvatarDirective = require("./avatar_directive");
    directive = new AvatarDirective();
    directive.link(scope);
  });

  it("should be defined", function () {
    expect(directive).to.be.defined;
  });

  it("should get the initial of the participant", function () {
    expect(scope.initial).to.equal("K");
  });
});