"use strict";

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
    directive.should.be.defined;
  });

  it("should get the initial of the participant", function () {
    scope.initial.should.equal("K");
  });
});